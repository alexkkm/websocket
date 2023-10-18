const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://alexkong0222:alexkong0222@cluster0.qpf52os.mongodb.net/?retryWrites=true&w=majority";

async function run() {
    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        // Provide the name of the database and collection you want to use.
        // If the database and/or collection do not exist, the driver and Atlas
        // will create them automatically when you first write data.
        const dbName = "Tutorial";
        const collectionName = "NodeJSAPI";

        // Create references to the database and collection in order to run
        // operations on them.
        const database = client.db(dbName);
        const collection = database.collection(collectionName);

        //* Insert Documents *//

        // Create 2 documents, with field "_id" and "info"
        const buffer = [
            {
                _id: 1,
                info: "Hi",
                value: 40
            },
            {
                _id: 2,
                info: "Bye",
                value: 50
            },
        ];


        // Insert the documents into the collection 
        try {
            const insertManyResult = await collection.insertMany(buffer);
            console.log(`${insertManyResult.insertedCount} documents successfully inserted.\n`);
        } catch (err) {
            console.error(`Something went wrong trying to insert the new documents: ${err}\n`);
        }

        //* Find Documents *//

        // Find all the documents in the collection that match with the "findQuery"
        const findQuery = { value: { $lt: 45 } };    // $lt: 45 (less than 45)
        /*  Expression of searching query
            $eq (equal to)
            $ne (not equal to)
            $in (in the group of)
            $nin (not in the group of)
            $gt (greater than)
            $gte (greater than or equal to)
            $lt (less than)
            $lte (less than or equal to)
        */

        // Display the searching result
        console.log("Searching result:");
        try {
            // find the documents match with "findQuery", and sort the result with "_id"
            const cursor = await collection.find(findQuery).sort({ _id: 1 });
            await cursor.forEach(doc => {
                console.log(`"_id: "${doc._id}: \n"info: "${doc.info}\n"value: "${doc.value}`); // display the matches documents
            });
            console.log();  // add a linebreak
        } catch (err) {
            console.error(`Something went wrong trying to find the documents: ${err}\n`);
        }

        // Find a single document that is the first document match with the "findOneQuery"
        const findOneQuery = { value: { $gt: 10 } };

        // Display the searching result
        console.log("Searching Result (Single Document):");
        try {
            const findOneResult = await collection.findOne(findOneQuery);
            if (findOneResult === null) {
                console.log(`Couldn't find any documents its "value" is greater than 10\n`);
            } else {
                console.log(`Found the first document match with "findOneQuery":\n${JSON.stringify(findOneResult)}\n`);
            }
        } catch (err) {
            console.error(`Something went wrong trying to find one document: ${err}\n`);
        }

        //* Update Document*//

        // define the update as: set "value" to be 72
        const updateDoc = { $set: { value: 72 } };

        // define the updateOption
        const updateOptions = { returnOriginal: false };    // returnOriginal: false (remove the origial document)

        // Search the target document by "findOneQuery" and update that document with the "updateDoc" and "updateOptions"
        try {
            console.log("Updating the document:")
            const updateResult = await collection.findOneAndUpdate(
                findOneQuery,
                updateDoc,
                updateOptions,
            );
            console.log(`Here is the updated document:\n${JSON.stringify(updateResult)}\n`);
        } catch (err) {
            console.error(`Something went wrong trying to update one document: ${err}\n`);
        }

        //* Delete Document *//

        // define the query for finding the document for deleting (delete documents with the "info" "Hi" or "Bye")
        const deleteQuery = { info: { $in: ["Hi", "Bye"] } };

        // Search the target document by "deleteQuery"
        try {
            const deleteResult = await collection.deleteMany(deleteQuery);
            console.log(`Deleted ${deleteResult.deletedCount} documents\n`);
        } catch (err) {
            console.error(`Something went wrong trying to delete documents: ${err}\n`);
        }

    }
    finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);