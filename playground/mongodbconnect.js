const { MongoClient, ObjectID} = require('mongodb');

MongoClient.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017',{ useNewUrlParser: true }, (error, client ) => {
    
    if (error){
        return console.log('Unable to connect to MongoDb server', error);
    }
    console.log('Successfully connected to mongodb');

    var db = client.db('TodoApp');

    // Insert document

    // db.collection('Todos').insertOne({
    //     _id: 1212,
    //     title: 'second Title',
    //     category: 'test category 2'
    // }, (error, result) => {
    //     console.log(error, result.ops);
    // });


    // Find documents

    // db.collection('Todos').find().toArray().then( documents => {
    //     console.log('Todos', JSON.stringify(documents, undefined, 2));
    // },(error) => {
    //     console.log('error', error);
    // });

    // db.collection('Todos').find({ category: 'test category'}).toArray().then( documents => {
    //     console.log('Todos', JSON.stringify(documents, undefined, 2));
    // },(error) => {
    //     console.log('error', error);
    // });

    // db.collection('Todos').finouhd({ 
    //     _id: new ObjectID('5b5874c9e64acf1cdab7bcf8')
    // }).toArray().then( documents => {
    //     console.log('Todos', JSON.stringify(documents, undefined, 2));
    // },(error) => {
    //     console.log('error', error);
    // });
    
    
    // Delete documents

    // db.collection('Todos')
    //     .deleteMany({title:"second Title"})
    //     .then(result => console.log(result.result));

    // db.collection('Todos')
    //     .deleteOne({title:"First Title"})
    //     .then(result => console.log(result.result));

    // db.collection('Todos')
    //     .findOneAndDelete({title:"eat one"})
    //     .then(result => console.log(result));

    // db.collection('Todos')
    //     .findOneAndDelete({_id: new ObjectID('5b751437cae8701af382d9f1')})
    //     .then(result => console.log(result));

    
    // Update document
    db.collection('Todos')
        .findOneAndUpdate(
            {_id: new ObjectID('5b7516d8cae8701af382d9f2')},
            {
                $set : {title: 'updated titless'},
                $inc: {
                    price:  1
                }
            },
            {
                returnOriginal: true
            }
        ).then(result => console.log(result));

    client.close();
})