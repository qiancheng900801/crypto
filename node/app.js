const mysql = require("mysql");
const crypto = require("crypto");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "sk"
});

const express = require("express");
const app = express();
express.static("public");
app.get("/api/add", (req, res) => {
  let json_obj = {
    name:'杨前程',
    sex:'man'
  };
  let json_str = JSON.stringify(json_obj);
  let secret = "yqc";
  let cipher = crypto.createCipher("aes192", secret);
  let enc = cipher.update(json_str, "utf8", "hex");
  enc += cipher.final("hex");
  connection.query(
    `insert into sk_test (json_str,age) values ('${enc}',18)`,
    (err1, res1, file1) => {
      if (err1) {
        console.log(err1);
        return;
      }
      res.send("OK");
    }
  );
});
app.get("/api/jieshou", (req, res) => {
  connection.query("select * from sk_test where age=18", (err1, res1, file) => {
    if (err1) {
      console.log(err1);
      return;
    }
    res.send(res1[0].json_str);
  });
});
app.listen(8080, () => {
  console.log("8080----");
});
