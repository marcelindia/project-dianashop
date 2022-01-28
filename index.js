const products = require("./products.json");

const {
  initializeApp,
  applicationDefault,
  cert,
} = require("firebase-admin/app");
const {
  getFirestore,
  Timestamp,
  FieldValue,
} = require("firebase-admin/firestore");

const credentials = require("./credentials.json");

initializeApp({
  credential: cert(credentials),
});
const dsdb = getFirestore();

const prodRef = dsdb.collection("products");

//>>>>add products
prodRef
  .add(products[4])
  .then((doc) => {
    console.log("Added product", doc.id);
  })
  .catch((err) => {
    console.error(err);
  });

//>>>read document
dsdb
  .collection("orders")
  .doc("NW0sfp7lKM01R6NxQ17D")
  .get()
  .then((doc) => {
    console.log(doc.id, " =>", doc.data());
  })
  .catch((err) => console.error(err));

//>>>>>querying a collection
dsdb
  .collection("customers")
  .where("first name", "==", "Diana")
  .get()
  .then((snapshot) => {
    snapshot.forEach((doc) => {
      console.log(doc.data());
    });
  })
  .catch(console.error);

//>>>>update a field
dsdb
  .collection("customers")
  .doc("kGvSMCRTID1JhyzVFTNq")
  .update({ "phone number": "(561) 878-9877" })
  .then((doc) => {
    console.log("customer phone number updated");
  })
  .catch((err) => {
    console.error;
  });
