var express = require("express");
var router = express.Router();

var mysql = require("mysql");
var moment = require("moment");

var uuid = require("uuid");

const commaNumber = require("comma-number");
const e = require("express");

var db_gate = {
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "comp@113",
  database: "db_native",
  // database: "db_lanmuanggate",
};

var conn;

function handleDisconnect() {
  //conn = mysql.createConnection(db_gate); // Recreate the connection, since
  conn = mysql.createPool(db_gate); // Recreate the connection, since
  // the old one cannot be reused.

  conn.getConnection(function (err) {
    // The server is either down
    if (err) {
      // or restarting (takes a while sometimes).
      console.log("error when connecting to db:", err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    } // to avoid a hot loop, and to allow our node script to
  }); // process asynchronous requests in the meantime.
  // If you're also serving http, display a 503 error.
  conn.on("error", function (err) {
    console.log("db error", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      // Connection to the MySQL server is usually
      handleDisconnect(); // lost due to either server restart, or a
    } else {
      // connnection idle timeout (the wait_timeout
      throw err; // server variable configures this)
    }
  });
}

handleDisconnect();

//#####################  Park ###################//
var db_park = {
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "comp@113",
  // password: "",  // for Dev
  // database: "db_park2",
  database: "db_park",
};

var conp;

function handleDisconnect_park() {
  //conn = mysql.createConnection(db_gate); // Recreate the connection, since
  conp = mysql.createPool(db_park); // Recreate the connection, since
  // the old one cannot be reused.

  conp.getConnection(function (err) {
    // The server is either down
    if (err) {
      // or restarting (takes a while sometimes).
      console.log("error when connecting to db:", err);
      setTimeout(handleDisconnect_park, 2000); // We introduce a delay before attempting to reconnect,
    } // to avoid a hot loop, and to allow our node script to
  }); // process asynchronous requests in the meantime.
  // If you're also serving http, display a 503 error.
  conp.on("error", function (err) {
    console.log("db error", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      // Connection to the MySQL server is usually
      handleDisconnect_park(); // lost due to either server restart, or a
    } else {
      // connnection idle timeout (the wait_timeout
      throw err; // server variable configures this)
    }
  });
}
handleDisconnect_park();

// ######################## end Park ###################/

//#####################  buffet ###################//
var db_buffet = {
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "comp@113",
  // password: "",  // for Dev
  database: "db_buffet",
};

var conb;

function handleDisconnect_buffet() {
  //conn = mysql.createConnection(db_gate); // Recreate the connection, since
  conb = mysql.createPool(db_buffet); // Recreate the connection, since
  // the old one cannot be reused.

  conb.getConnection(function (err) {
    // The server is either down
    if (err) {
      // or restarting (takes a while sometimes).
      console.log("error when connecting to db:", err);
      setTimeout(handleDisconnect_buffet, 2000); // We introduce a delay before attempting to reconnect,
    } // to avoid a hot loop, and to allow our node script to
  }); // process asynchronous requests in the meantime.
  // If you're also serving http, display a 503 error.
  conp.on("error", function (err) {
    console.log("db error", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      // Connection to the MySQL server is usually
      handleDisconnect_buffet(); // lost due to either server restart, or a
    } else {
      // connnection idle timeout (the wait_timeout
      throw err; // server variable configures this)
    }
  });
}
handleDisconnect_buffet();

// ######################## end Buffet ###################/

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/test", function (req, res, next) {
  // console.log("test");
  res.end();
});

router.post("/login", (req, res) => {
  async function main() {
    getData();
  }
  main();

  function getData() {
    let username = req.body.username;
    let password = req.body.password;
    // console.log("username = " + username);
    // console.log("password = " + password);
    let sql = "SELECT * FROM staff ";
    sql += "WHERE username = ? AND password = ?";
    conn.query(sql, [username, password], (err, resp) => {
      if (err) {
        console.log("[mysql err]", err);
      }
      // console.log(resp);
      res.send(resp);
    });
  }
});

// admin login
router.post("/adminlogin", (req, res) => {
  async function main() {
    getData();
  }
  main();

  function getData() {
    let username = req.body.username;
    let password = req.body.password;
    // console.log("username = " + username);
    // console.log("password = " + password);
    let sql = "SELECT * FROM user ";
    sql += "WHERE username = ? AND password = ?";
    conn.query(sql, [username, password], (err, resp) => {
      if (err) {
        console.log("[mysql err]", err);
      }
      // console.log(resp);
      res.send(resp);
    });
  }
});

// staffcheck login
router.post("/pstaffchecklogin", (req, res) => {
  console.log("pstaffchecklogin");
  // console.log(req.body);

  async function main() {
    getData();
  }
  main();

  function getData() {
    let username = req.body.username;
    let password = req.body.password;
    // console.log("username = " + username);
    // console.log("password = " + password);
    let sql = "SELECT * FROM staffcheck WHERE username = ? AND password = ? ";
    conp.query(sql, [username, password], (err, resp) => {
      if (err) {
        console.log("[mysql err]", err);
      }
      // console.log(resp);
      res.send(resp);
    });
  }
});
// end staff login

router.get("/pfindstafcheckfid", (req, res) => {
  console.log("pass");
  let user = req.query.user;
  let sql = "SELECT * FROM staffcheck WHERE username = ?";
  conp.query(sql, [user], (err, resp) => {
    if (err) {
      console.log("[mysql err]", err);
    }
    console.log(resp);
    res.send(resp);
  });
});

// อัฟเดท ตาราง ticker โดย idftaffcheck เป็นค่าที่รับมา เงื่อนไขตางตาม id ของ ticker
router.post("/pupdatecheck", (req, res) => {
  console.log("pupdatecheck");
  console.log(req.body);
  let idstaffcheck = req.body.id;
  let idticker = req.body.idticker;

  let sql = "UPDATE ticker SET idftaffcheck = ? WHERE id = ?";
  conp.query(sql, [idstaffcheck, idticker], (err, resp) => {
    if (err) {
      console.log("[mysql err]", err);
    }
    // console.log(resp);
    res.end();
  });
});

// IOS
// router.get("/pupdatecheck", (req, res) => {
//   console.log("pupdatecheck");
//   console.log(req.body);
//   let idstaffcheck = req.body.id;
//   let idticker = req.body.idticker;

//   let sql = "UPDATE ticker SET idftaffcheck = ? WHERE id = ?";
//   conp.query(sql, [idstaffcheck, idticker], (err, resp) => {
//     if (err) {
//       console.log("[mysql err]", err);
//     }
//     // console.log(resp);
//     res.end();
//   });
// });

// staff login
router.post("/pstafflogin", (req, res) => {
  console.log("pstafflogin");
  // console.log(req.body);

  async function main() {
    getData();
  }
  main();

  function getData() {
    let username = req.body.username;
    let password = req.body.password;
    // console.log("username = " + username);
    // console.log("password = " + password);
    let sql = "SELECT * FROM staff WHERE username = ? AND password = ? ";
    conp.query(sql, [username, password], (err, resp) => {
      if (err) {
        console.log("[mysql err]", err);
      }
      console.log(resp);
      res.send(resp);
    });
  }
});
// end staff login

// Build
router.post("/addbuild", (req, res) => {
  function fnGetData() {
    let valbuild = req.body.build;
    let sql = "INSERT INTO build (buildname,status) VALUES(?,?)";
    conn.query(sql, [valbuild, 1], (err, resp) => {
      if (err) {
        console.log("[mysql error]", err);
      }
      res.end();
    });
  }
  async function main() {
    fnGetData();
  }
  main();
});

router.get("/listbuild", (req, res) => {
  let sql = "SELECT * FROM build";
  conn.query(sql, (err, resp) => {
    res.send(resp);
  });
});

router.post("/delbuild", (req, res) => {
  function fnDelData() {
    let valid = req.body.id;
    let sql = "DELETE FROM build WHERE id = ?";
    conn.query(sql, [valid], (err, resp) => {
      if (err) {
        console.log("[mysql error]", err);
      }
      res.end();
    });
  }

  async function main() {
    fnDelData();
  }
  main();
});

router.get("/selectbuild", (req, res) => {
  let valid = req.query.id;
  let sql = "SELECT * FROM build WHERE id = ?";
  conn.query(sql, [valid], (err, resp) => {
    if (err) {
      console.log("[mysql error]", err);
    }
    // console.log(resp);
    res.send(resp);
  });
});

router.post("/editbuild", (req, res) => {
  function fnEditData() {
    let valid = req.body.id;
    let valname = req.body.buildname;
    let sql = "UPDATE build SET buildname = ? WHERE id = ?";
    conn.query(sql, [valname, valid], (err, resp) => {
      if (err) {
        console.log("[mysql error]", err);
      }
      res.end();
    });
  }

  async function main() {
    fnEditData();
  }
  main();
});
// End Build

router.get("/findstaffid", (req, res) => {
  let user = req.query.user;
  let sql = "SELECT * FROM staff WHERE username = ?";
  conn.query(sql, [user], (err, resp) => {
    if (err) {
      console.log("[mysql err]", err);
    }
    // console.log(resp);
    res.send(resp);
  });
});

router.get("/listbuildfromrole", (req, res) => {
  let id = req.query.id;
  // console.log("listbuildfromrole =" + id);
  let sql = "SELECT *,role.id As idrole,role.idbuild As idbuild ";
  sql += "FROM role ";
  sql += "INNER JOIN staff ON role.idstaff = staff.id ";
  sql += "INNER JOIN build ON role.idbuild = build.id ";
  sql += "INNER JOIN zone ON role.idzone = zone.id ";
  sql += "WHERE idstaff = ? ";
  sql += "GROUP by role.idbuild ";
  sql += "ORDER by role.idbuild ";
  conn.query(sql, [id], (err, resp) => {
    if (err) {
      console.log("[mysql err]", err);
    }
    // console.log(resp);
    res.send(resp);
  });
});

router.get("/listpanelfromrole", (req, res) => {
  let idbuild = req.query.idbuild;
  let idzone = req.query.idzone;
  // console.log("idbuild =" + idbuild);
  // console.log("idzone =" + idzone);
  let sql = "SELECT *,boxs.id As idboxs FROM boxs  ";
  sql += "INNER JOIN customer ON boxs.idcustomer = customer.id ";
  sql += "WHERE idbuild = ? AND idzone = ?";

  conn.query(sql, [idbuild, idzone], (err, resp) => {
    if (err) {
      console.log("[mysql err]", err);
    }
    // console.log(resp);
    res.send(resp);
  });
});

// Zone
router.post("/addzone", (req, res) => {
  function fnGetData() {
    let valzone = req.body.zone;
    let sql = "INSERT INTO zone (zonename,status) VALUES(?,?)";
    conn.query(sql, [valzone, 1], (err, resp) => {
      if (err) {
        console.log("[mysql error]", err);
      }
      res.end();
    });
  }
  async function main() {
    fnGetData();
  }
  main();
});

router.get("/listzone", (req, res) => {
  let sql = "SELECT * FROM zone";
  conn.query(sql, (err, resp) => {
    res.send(resp);
  });
});

router.post("/delzone", (req, res) => {
  function fnDelData() {
    let valid = req.body.id;
    let sql = "DELETE FROM zone WHERE id = ?";
    conn.query(sql, [valid], (err, resp) => {
      if (err) {
        console.log("[mysql error]", err);
      }
      res.end();
    });
  }

  async function main() {
    fnDelData();
  }
  main();
});

router.get("/listzoneapp", (req, res) => {
  let idbuild = req.query.idbuild;
  let iduser = req.query.iduser;
  console.log("idbuild = " + idbuild);
  // console.log("iduser = " + iduser);

  let sql = "SELECT *,role.id As idrole ";
  sql += "FROM role ";
  sql += "INNER JOIN staff ON role.idstaff = staff.id ";
  sql += "INNER JOIN build ON role.idbuild = build.id ";
  sql += "INNER JOIN zone ON role.idzone = zone.id ";
  sql += "WHERE role.idstaff = ? AND role.idbuild = ? ";
  sql += "GROUP by role.idzone ";
  sql += "ORDER by role.idzone ";
  conn.query(sql, [iduser, idbuild], (err, resp) => {
    if (err) {
      console.log("[mysql err]", err);
    }
    // console.log(resp);
    res.send(resp);
  });
});

router.get("/selectzone", (req, res) => {
  let valid = req.query.id;
  let sql = "SELECT * FROM zone WHERE id = ?";
  conn.query(sql, [valid], (err, resp) => {
    if (err) {
      console.log("[mysql error]", err);
    }
    // console.log(resp);
    res.send(resp);
  });
});

router.post("/editzone", (req, res) => {
  function fnEditData() {
    let valid = req.body.id;
    let valname = req.body.zonename;
    let sql = "UPDATE zone SET zonename = ? WHERE id = ?";
    conn.query(sql, [valname, valid], (err, resp) => {
      if (err) {
        console.log("[mysql error]", err);
      }
      res.end();
    });
  }

  async function main() {
    fnEditData();
  }
  main();
});
// End Zone

// Panel
router.post("/addpanel", (req, res) => {
  function fnGetData() {
    let valpanel = req.body.panel;
    let sql = "INSERT INTO panel (panelname,status) VALUES(?,?)";
    conn.query(sql, [valpanel, 1], (err, resp) => {
      if (err) {
        console.log("[mysql error]", err);
      }
      res.end();
    });
  }
  async function main() {
    fnGetData();
  }
  main();
});

router.get("/listpanel", (req, res) => {
  let sql = "SELECT * FROM panel";
  conn.query(sql, (err, resp) => {
    res.send(resp);
  });
});

router.post("/delpanel", (req, res) => {
  function fnDelData() {
    let valid = req.body.id;
    let sql = "DELETE FROM panel WHERE id = ?";
    conn.query(sql, [valid], (err, resp) => {
      if (err) {
        console.log("[mysql error]", err);
      }
      res.end();
    });
  }

  async function main() {
    fnDelData();
  }
  main();
});

router.get("/selectpanel", (req, res) => {
  let valid = req.query.id;
  let sql = "SELECT * FROM panel WHERE id = ?";
  conn.query(sql, [valid], (err, resp) => {
    if (err) {
      console.log("[mysql error]", err);
    }
    // console.log(resp);
    res.send(resp);
  });
});

router.post("/editpanel", (req, res) => {
  function fnEditData() {
    let valid = req.body.id;
    let valname = req.body.panelname;
    let sql = "UPDATE panel SET panelname = ? WHERE id = ?";
    conn.query(sql, [valname, valid], (err, resp) => {
      if (err) {
        console.log("[mysql error]", err);
      }
      res.end();
    });
  }

  async function main() {
    fnEditData();
  }
  main();
});
// End Panel

router.get("/listprovince", (req, res) => {
  let sql = "SELECT * FROM provinces ";
  conn.query(sql, (err, resp) => {
    if (err) {
      console.log("[mysql error]", err);
    }
    res.send(resp);
  });
});

router.get("/listdist", (req, res) => {
  // console.log("listdist");
  let sql = "SELECT * FROM district WHERE province_code = ?";
  let id = req.query.id;
  conn.query(sql, [id], (err, resp) => {
    if (err) {
      console.log("[mysql error]", err);
    }
    // console.log(resp);
    res.send(resp);
  });
});

router.get("/selectdist", (req, res) => {
  let sql = "SELECT * FROM subdistrict WHERE district_code = ?";
  let id = req.query.id;
  conn.query(sql, [id], (err, resp) => {
    if (err) {
      console.log("[mysql error]", err);
    }
    // console.log(resp);
    res.send(resp);
  });
});

router.get("/selectzipcode", (req, res) => {
  let sql = "SELECT * FROM subdistrict WHERE code = ?";
  let id = req.query.id;
  conn.query(sql, [id], (err, resp) => {
    if (err) {
      console.log("[mysql error]", err);
    }
    // console.log(resp);
    res.send(resp);
  });
});

router.post("/addcustomer", (req, res) => {
  let uuuid = uuid.v1();
  let data = req.body;
  let golNamePic = "";
  // console.log("**************");
  // console.log(data);
  // console.log("**************");
  // console.log(data);

  function main() {
    getData();
  }
  main();

  function getData() {
    if (req.files === "null") {
      AddData();
    } else {
      // console.log("test");

      if (!req.files || Object.keys(req.files).length === 0) {
        // return res.status(400).send("No files were uploaded.");
        AddData();
      } else {
        let newname = req.files.picture.name;
        let blobfile = req.files.picture;
        let timePic = moment().format("YY_MM_DD_HH_mm_ss");
        let namePic = timePic + newname;
        golNamePic = namePic;
        // Use the mv() method to place the file somewhere on your server
        blobfile.mv("./public/upload/" + namePic, function (err) {
          if (err) return res.status(500).send(err);
          // conn.query(sql, [idProduct, namePic, 1], (err, resIns) => {
          if (err) {
            console.log("[mysql error]", err);
          }
          AddData();
          // });
        });
      }
    }
  }

  function AddData() {
    let uuuid = uuid.v1();
    let name = req.body.name;
    let lastname = req.body.lastname;
    let nickname = req.body.nickname;
    let address = req.body.address;
    let cardid = req.body.cardid;
    let tel = req.body.tel;
    let dist = req.body.dist;
    let subdist = req.body.subdist;
    let province = req.body.province;
    let zipcode = req.body.zipcode;

    let sql = "INSERT INTO customer ";
    sql +=
      "(uuid,name,lastname,nickname,cardid,address,tumbol,aumpur,provinc,zipcode,tel,picture,status) ";
    sql += "VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)";
    conn.query(
      sql,
      [
        uuuid,
        name,
        lastname,
        nickname,
        cardid,
        address,
        subdist,
        dist,
        province,
        zipcode,
        tel,
        golNamePic,
        1,
      ],
      (err, resp) => {
        if (err) {
          console.log("[mysql error]", err);
        }
        sendData();
      }
    );
  }

  function sendData() {
    res.end();
  }
});

router.get("/allsubdistrict", (req, res) => {
  let sql = "SELECT * FROM `subdistrict`";
  conn.query(sql, (err, resp) => {
    res.send(resp);
  });
});

router.get("/alldistrict", (req, res) => {
  let sql = "SELECT * FROM `district`";
  conn.query(sql, (err, resp) => {
    res.send(resp);
  });
});

router.get("/listcustomer", (req, res) => {
  // let sql = "SELECT * FROM customer WHERE status = 1";

  let sql = "SELECT *,customer.id As idcus FROM customer ";
  sql += "LEFT JOIN boxs ON boxs.idcustomer = customer.id ";
  sql += "LEFT JOIN build ON boxs.idbuild = build.id ";
  sql += "LEFT JOIN zone ON boxs.idzone = zone.id ";
  sql += "LIMIT 0,30";
  // console.log(sql);

  conn.query(sql, (err, resp) => {
    if (err) {
      console.log("[mysql error]", err);
    }
    // console.log(resp[0]);
    res.send(resp);
  });
});

//Customerpay.js

router.get("/listcustomerpay", (req, res) => {
  // let sql = "SELECT * FROM customer WHERE status = 1";
  let data = [];
  let nowdate = moment().format("YYYY-MM-DD");

  async function main() {
    await getData();
  }
  main();

  function getData() {
    let sql =
      "SELECT *,customer.id As idcus,boxs.id As idboxs,boxs.debit As debit ";
    sql += ",boxs.status As boxsstatus ";
    sql += "FROM boxs ";
    sql += "LEFT JOIN customer ON boxs.idcustomer = customer.id ";
    sql += "LEFT JOIN build ON boxs.idbuild = build.id ";
    sql += "LEFT JOIN zone ON boxs.idzone = zone.id ";
    sql += "LEFT JOIN payrecord ON boxs.id = payrecord.idboxs ";
    // sql += "WHERE payrecord.datepay= ?"
    sql += "group by boxs.id ";
    sql += "ORDER BY boxs.idorder ASC ";
    sql += "LIMIT 1,20 ";

    conn.query(sql, [nowdate], (err, resp) => {
      if (err) {
        console.log("[mysql error]", err);
      }
      // console.log(resp[0]);
      data = resp;
      if (resp.length > 0) {
        mapData();
      } else {
        sendData(0);
      }
    });
  }

  function mapData() {
    let today = moment().format("YYYY-MM-DD");
    let statusToday = 0;
    let totalAllPay = 0;
    let pricepay = 0;
    let toalBackdebit = 0;

    let mData = data.map((item) => {
      let b = moment(item.curdate);
      let a = moment();
      let unitdate = a.diff(b, "days");

      let totalpay = item.price * unitdate - item.overpay;
      totalAllPay += totalpay;

      let backdebit = 0;
      // ค้างยกมา

      // รวมค้างยกมา
      if (moment(item.nowdate).format("YYYY-MM-DD") == today) {
        pricepay = item.pricepay;
        backdebit = totalpay - item.price + item.nowpaid;
      } else {
        pricepay = 0;
        backdebit = totalpay - item.price;
      }

      toalBackdebit = toalBackdebit + backdebit;

      //**** เช็คจ่ายแล้ว วันนี้ */
      if (today == moment(item.nowdate).format("YYYY-MM-DD")) {
        statusToday = 1;
      } else {
        statusToday = 0;
      }
      //**** เช็คจ่ายแล้ว วันนี้ */

      return {
        idcus: item.idcustomer,
        name: item.name + " " + item.lastname,
        tel: item.tel,
        price: item.price,
        unitdate: unitdate,
        totalpay,
        namepanel: item.namepanel,
        curdate: moment(item.curdate).format("DD-MM-YYYY"),
        idboxs: item.idboxs,
        overpay: item.overpay,
        debit: item.debit,
        backdebit: backdebit,
        re_debit: item.re_debit,
        pricepay: pricepay,
        nowdate: item.nowdate,
        nowpaid: item.nowpaid,
        statustoday: statusToday,
        idorder: item.idorder,
        boxsstatus: item.boxsstatus,
      };
    });
    data = mData;
    totalnowpaid(toalBackdebit);
  }

  function totalnowpaid(toalBackdebit) {
    let valtotalnowpaid = 0; // ยอดรวมจ่ายวันนี้
    for (let i = 0; i < data.length; i++) {
      if (data[i].statustoday == 1) {
        valtotalnowpaid = valtotalnowpaid + data[i].nowpaid;
      }
      if (i == data.length - 1) {
        total(toalBackdebit, valtotalnowpaid);
      }
    }
  }

  function total(toalBackdebit, valtotalnowpaid) {
    let totalpay = 0; // ค่าเช่าทั้งหมด
    let totalpaied = 0;
    let totalpanelprice = 0;
    for (let i = 0; i < data.length; i++) {
      totalpay += data[i].totalpay;
      totalpanelprice += data[i].price;
      totalpaied += data[i].pricepay;
      if (i == data.length - 1) {
        sendData(
          commaNumber(toalBackdebit),
          commaNumber(valtotalnowpaid),
          commaNumber(totalpay),
          commaNumber(totalpaied),
          commaNumber(totalpanelprice)
        );
      }
    }
  }

  function sendData(
    toalBackdebit,
    totalnowpaid,
    totalpay,
    totalpaied,
    totalpanelprice
  ) {
    // console.log(data);
    // console.log("total = " + totalpay);
    res.send({
      data,
      toalBackdebit,
      totalpay,
      totalpaied,
      nowdate,
      totalnowpaid,
      totalpanelprice,
    });
  }
});

router.get("/listcustomerfornamepay", (req, res) => {
  // ค้นหา Customer ด้วยชื่อ
  let totalunit = 0; // จำนวนแผง
  let data = [];
  let nowdate = moment().format("YYYY-MM-DD");

  async function main() {
    await getData();
  }
  main();

  function getData() {
    let name = req.query.name;
    name = "%" + name + "%";
    let sql =
      "SELECT *,customer.id As idcus,boxs.id As idboxs ,boxs.debit As debit ";
    sql += ",boxs.status As boxsstatus ";
    sql += "FROM boxs ";
    sql += "LEFT JOIN customer ON boxs.idcustomer = customer.id ";
    sql += "LEFT JOIN build ON boxs.idbuild = build.id ";
    sql += "LEFT JOIN zone ON boxs.idzone = zone.id ";
    sql += "LEFT JOIN payrecord ON boxs.id = payrecord.idboxs ";
    sql += "WHERE name LIKE ? ";
    sql += "group by boxs.id ";
    sql += "ORDER BY boxs.idorder ASC";
    // console.log(sql);

    conn.query(sql, [name], (err, resp) => {
      if (err) {
        console.log("[mysql error]", err);
      }
      data = resp;
      if (resp.length > 0) {
        mapData();
      } else {
        sendData(0);
      }
    });
  }

  function mapData() {
    let today = moment().format("YYYY-MM-DD");
    let statusToday = 0;
    let totalAllPay = 0;
    let pricepay = 0;
    let toalBackdebit = 0;

    let mData = data.map((item) => {
      let b = moment(item.curdate);
      let a = moment();
      let unitdate = a.diff(b, "days");

      let totalpay = item.price * unitdate - item.overpay;
      totalAllPay += totalpay;

      let backdebit = 0;
      // ค้างยกมา

      // รวมค้างยกมา
      if (moment(item.nowdate).format("YYYY-MM-DD") == today) {
        pricepay = item.pricepay;
        backdebit = totalpay - item.price + item.nowpaid;
      } else {
        pricepay = 0;
        backdebit = totalpay - item.price;
      }

      toalBackdebit = toalBackdebit + backdebit;

      //**** เช็คจ่ายแล้ว วันนี้ */
      if (today == moment(item.nowdate).format("YYYY-MM-DD")) {
        statusToday = 1;
      } else {
        statusToday = 0;
      }
      //**** เช็คจ่ายแล้ว วันนี้ */

      return {
        idcus: item.idcustomer,
        name: item.name + " " + item.lastname,
        tel: item.tel,
        price: item.price,
        unitdate: unitdate,
        totalpay: totalpay,
        namepanel: item.namepanel,
        curdate: moment(item.curdate).format("DD-MM-YYYY"),
        idboxs: item.idboxs,
        overpay: item.overpay,
        debit: item.debit,
        backdebit: backdebit,
        re_debit: item.re_debit,
        pricepay: pricepay,
        nowdate: item.nowdate,
        nowpaid: item.nowpaid,
        statustoday: statusToday,
        idorder: item.idorder,
        boxsstatus: item.boxsstatus,
      };
    });
    data = mData;
    totalnowpaid(toalBackdebit);
  }

  function totalnowpaid(toalBackdebit) {
    let valtotalnowpaid = 0; // ยอดรวมจ่ายวันนี้
    for (let i = 0; i < data.length; i++) {
      if (data[i].statustoday == 1) {
        valtotalnowpaid = valtotalnowpaid + data[i].nowpaid;
      }
      if (i == data.length - 1) {
        fnTotalunit(toalBackdebit, valtotalnowpaid);
      }
    }
  }

  function fnTotalunit(toalBackdebit, valtotalnowpaid) {
    let name = req.query.name;
    name = "%" + name + "%";
    let sql = "SELECT COUNT(*) As totalunit FROM customer ";
    sql += "INNER JOIN boxs ON boxs.idcustomer = customer.id ";
    sql += "LEFT JOIN build ON boxs.idbuild = build.id ";
    sql += "LEFT JOIN zone ON boxs.idzone = zone.id ";
    sql += "WHERE name LIKE ?";
    conn.query(sql, [name], (err, resp) => {
      if (err) {
        console.log("[mysql error]", err);
      }
      // console.log(resp);
      // totalunit
      totalunit = resp[0].totalunit;
      total(toalBackdebit, valtotalnowpaid);
    });
  }

  function total(toalBackdebit, valtotalnowpaid) {
    let totalpay = 0; // ค่าเช่าทั้งหมด
    let totalpaied = 0;
    let totalpanelprice = 0;
    for (let i = 0; i < data.length; i++) {
      totalpay += data[i].totalpay;
      totalpanelprice += data[i].price;
      totalpaied += data[i].pricepay;
      if (i == data.length - 1) {
        sendData(
          commaNumber(toalBackdebit),
          commaNumber(valtotalnowpaid),
          commaNumber(totalpay),
          commaNumber(totalpaied),
          commaNumber(totalpanelprice)
        );
      }
    }
  }

  function sendData(
    toalBackdebit,
    totalnowpaid,
    totalpay,
    totalpaied,
    totalpanelprice
  ) {
    // console.log(data);
    // console.log("total = " + totalpay);
    res.send({
      data,
      toalBackdebit,
      totalpay,
      totalpaied,
      nowdate,
      totalnowpaid,
      totalpanelprice,
    });
  }
});

router.get("/listcustomerfortelpay", (req, res) => {
  let data = [];
  let totalunit = 0;
  let nowdate = moment().format("YYYY-MM-DD");

  async function main() {
    await getData();
  }
  main();

  function getData() {
    let valtel = req.query.tel;
    valtel = "%" + valtel + "%";
    let sql =
      "SELECT *,customer.id As idcus,boxs.id As idboxs ,boxs.debit As debit  ";
    sql += ",boxs.status As boxsstatus ";
    sql += "FROM boxs ";
    sql += "LEFT JOIN customer ON boxs.idcustomer = customer.id ";
    sql += "LEFT JOIN build ON boxs.idbuild = build.id ";
    sql += "LEFT JOIN zone ON boxs.idzone = zone.id ";
    sql += "WHERE tel LIKE ? ";
    sql += "group by boxs.id ";

    conn.query(sql, [valtel], (err, resp) => {
      if (err) {
        console.log("[mysql error]", err);
      }
      data = resp;
      if (resp.length > 0) {
        mapData();
      } else {
        sendData(0);
      }
    });
  }

  function mapData() {
    let today = moment().format("YYYY-MM-DD");
    let statusToday = 0;
    let totalAllPay = 0;
    let pricepay = 0;
    let toalBackdebit = 0;

    let mData = data.map((item) => {
      let b = moment(item.curdate);
      let a = moment();
      let unitdate = a.diff(b, "days");

      let totalpay = item.price * unitdate - item.overpay;
      totalAllPay += totalpay;

      let backdebit = 0;
      // ค้างยกมา

      // รวมค้างยกมา
      if (moment(item.nowdate).format("YYYY-MM-DD") == today) {
        pricepay = item.pricepay;
        backdebit = totalpay - item.price + item.nowpaid;
      } else {
        pricepay = 0;
        backdebit = totalpay - item.price;
      }

      toalBackdebit = toalBackdebit + backdebit;

      //**** เช็คจ่ายแล้ว วันนี้ */
      if (today == moment(item.nowdate).format("YYYY-MM-DD")) {
        statusToday = 1;
      } else {
        statusToday = 0;
      }
      //**** เช็คจ่ายแล้ว วันนี้ */

      return {
        idcus: item.idcustomer,
        name: item.name + " " + item.lastname,
        tel: item.tel,
        price: item.price,
        unitdate: unitdate,
        totalpay,
        namepanel: item.namepanel,
        curdate: moment(item.curdate).format("DD-MM-YYYY"),
        idboxs: item.idboxs,
        overpay: item.overpay,
        debit: item.debit,
        backdebit: backdebit,
        re_debit: item.re_debit,
        pricepay: pricepay,
        nowdate: item.nowdate,
        nowpaid: item.nowpaid,
        statustoday: statusToday,
        idorder: item.idorder,
        boxsstatus: item.boxsstatus,
      };
    });
    data = mData;
    totalnowpaid(toalBackdebit);
  }

  function totalnowpaid(toalBackdebit) {
    let valtotalnowpaid = 0; // ยอดรวมจ่ายวันนี้
    for (let i = 0; i < data.length; i++) {
      if (data[i].statustoday == 1) {
        valtotalnowpaid = valtotalnowpaid + data[i].nowpaid;
      }
      if (i == data.length - 1) {
        total(toalBackdebit, valtotalnowpaid);
      }
    }
  }

  function total(toalBackdebit, valtotalnowpaid) {
    let totalpay = 0; // ค่าเช่าทั้งหมด
    let totalpaied = 0;
    let totalpanelprice = 0;
    for (let i = 0; i < data.length; i++) {
      totalpay += data[i].totalpay;
      totalpanelprice += data[i].price;
      totalpaied += data[i].pricepay;
      if (i == data.length - 1) {
        sendData(
          commaNumber(toalBackdebit),
          commaNumber(valtotalnowpaid),
          commaNumber(totalpay),
          commaNumber(totalpaied),
          commaNumber(totalpanelprice)
        );
      }
    }
  }
  function sendData(
    toalBackdebit,
    totalnowpaid,
    totalpay,
    totalpaied,
    totalpanelprice
  ) {
    // console.log(data);
    // console.log("total = " + totalpay);
    res.send({
      data,
      toalBackdebit,
      totalpay,
      totalpaied,
      nowdate,
      totalnowpaid,
      totalpanelprice,
    });
  }

  function fnTotalunit() {
    let valtel = req.query.idcard;
    valtel = "%" + valtel + "%";
    let sql = "SELECT COUNT(*) AS totalunit FROM customer ";
    sql += "INNER JOIN boxs ON boxs.idcustomer = customer.id ";
    sql += "LEFT JOIN build ON boxs.idbuild = build.id ";
    sql += "LEFT JOIN zone ON boxs.idzone = zone.id ";
    sql += "WHERE tel LIKE ?";

    conn.query(sql, [valtel], (err, resp) => {
      if (err) {
        console.log("[mysql error]", err);
      }
      // console.log(resp);
      // totalunit
      totalunit = resp[0].totalunit;
      total();
    });
  }

  // function total() {
  //   let totalpay = 0;
  //   for (let i = 0; i < data.length; i++) {
  //     totalpay += data[i].totalpay;
  //     if (i == data.length - 1) {
  //       sendData(totalpay);
  //     }
  //   }
  // }
});

router.get("/listcustomerforidbuildandzonepay", (req, res) => {
  let data = [];
  let totalunit = 0;
  let nowdate = moment().format("YYYY-MM-DD");

  async function main() {
    await getData();
  }
  main();

  function getData() {
    let idzone = req.query.idzone;
    let idbuild = req.query.idbuild;
    // console.log("idzone = " + idzone);
    // console.log("idbuild = " + idbuild);

    let sql =
      "SELECT *,boxs.id AS idboxs,customer.id AS idcus ,boxs.debit As debit ";
    sql += ",boxs.status As boxsstatus ";
    sql += "FROM boxs ";
    sql += "LEFT JOIN customer ON boxs.idcustomer = customer.id ";
    sql += "LEFT JOIN build ON boxs.idbuild = build.id ";
    sql += "LEFT JOIN zone ON boxs.idzone = zone.id ";
    sql += "LEFT JOIN payrecord ON boxs.id = payrecord.idboxs ";
    sql += "WHERE boxs.idzone = ? AND boxs.idbuild = ? AND boxs.status = 1 ";
    sql += "GROUP BY boxs.id ";
    sql += "ORDER BY boxs.idorder ASC";

    // console.log(sql);

    conn.query(sql, [idzone, idbuild], (err, resp) => {
      if (err) {
        console.log("[mysql error]", err);
      }
      // console.log(resp);
      data = resp;
      if (resp.length > 0) {
        mapData();
      } else {
        sendData(0);
      }
    });
  }

  function mapData() {
    let today = moment().format("YYYY-MM-DD");
    let statusToday = 0;

    let totalAllPay = 0;
    let pricepay = 0;
    let toalBackdebit = 0;

    let mData = data.map((item) => {
      let b = moment(item.curdate);
      let a = moment();
      let unitdate = a.diff(b, "days");

      let totalpay = item.price * unitdate - item.overpay;
      totalAllPay += totalpay;

      let backdebit = 0;
      // ค้างยกมา

      // รวมค้างยกมา
      if (moment(item.nowdate).format("YYYY-MM-DD") == today) {
        pricepay = item.pricepay;
        backdebit = totalpay - item.price + item.nowpaid;
      } else {
        pricepay = 0;
        backdebit = totalpay - item.price;
      }

      toalBackdebit = toalBackdebit + backdebit;

      //**** เช็คจ่ายแล้ว วันนี้ */
      if (today == moment(item.nowdate).format("YYYY-MM-DD")) {
        statusToday = 1;
      } else {
        statusToday = 0;
      }
      //**** เช็คจ่ายแล้ว วันนี้ */

      return {
        idcus: item.idcustomer,
        name: item.name + " " + item.lastname,
        tel: item.tel,
        price: item.price,
        unitdate: unitdate,
        totalpay: totalpay,
        namepanel: item.namepanel,
        curdate: moment(item.curdate).format("DD-MM-YYYY"),
        idboxs: item.idboxs,
        overpay: item.overpay,
        debit: item.debit,
        backdebit: backdebit,
        re_debit: item.re_debit,
        pricepay: pricepay,
        nowdate: item.nowdate,
        nowpaid: item.nowpaid,
        statustoday: statusToday,
        idorder: item.idorder,
        boxsstatus: item.boxsstatus,
      };
    });
    data = mData;
    totalnowpaid(toalBackdebit);
  }

  function totalnowpaid(toalBackdebit) {
    let valtotalnowpaid = 0; // ยอดรวมจ่ายวันนี้
    for (let i = 0; i < data.length; i++) {
      if (data[i].statustoday == 1) {
        valtotalnowpaid = valtotalnowpaid + data[i].nowpaid;
      }
      if (i == data.length - 1) {
        fnTotalunit(toalBackdebit, valtotalnowpaid);
      }
    }
  }

  function fnTotalunit(toalBackdebit, valtotalnowpaid) {
    let idzone = req.query.idzone;
    let idbuild = req.query.idbuild;
    let sql = "SELECT COUNT(*) As totalunit FROM customer ";
    sql += "INNER JOIN boxs ON boxs.idcustomer = customer.id ";
    sql += "LEFT JOIN build ON boxs.idbuild = build.id ";
    sql += "LEFT JOIN zone ON boxs.idzone = zone.id ";
    sql += "WHERE boxs.idzone = ? AND boxs.idbuild = ?";

    conn.query(sql, [idzone, idbuild], (err, resp) => {
      if (err) {
        console.log("[mysql error]", err);
      }
      // console.log(resp);
      // totalunit
      totalunit = resp[0].totalunit;
      total(toalBackdebit, valtotalnowpaid);
    });
  }

  function total(toalBackdebit, valtotalnowpaid) {
    let totalpay = 0; // ค่าเช่าทั้งหมด
    let totalpaied = 0;
    let totalpanelprice = 0;
    for (let i = 0; i < data.length; i++) {
      totalpay += data[i].totalpay;
      totalpanelprice += data[i].price;
      totalpaied += data[i].pricepay;
      if (i == data.length - 1) {
        sendData(
          commaNumber(toalBackdebit),
          commaNumber(valtotalnowpaid),
          commaNumber(totalpay),
          commaNumber(totalpaied),
          commaNumber(totalpanelprice)
        );
      }
    }
  }

  function sendData(
    toalBackdebit,
    totalnowpaid,
    totalpay,
    totalpaied,
    totalpanelprice
  ) {
    // console.log(data[0]);
    // console.log("total = " + totalpay);
    res.send({
      data,
      toalBackdebit,
      totalpay,
      totalpaied,
      nowdate,
      totalnowpaid,
      totalpanelprice,
    });
  }
});

router.get("/listcustomerforidbuildandzonepayforadmin", (req, res) => {
  let data = [];
  let totalunit = 0;
  let nowdate = moment().format("YYYY-MM-DD");

  async function main() {
    await getData();
  }
  main();

  function getData() {
    let idzone = req.query.idzone;
    let idbuild = req.query.idbuild;
    // console.log("idzone = " + idzone);
    // console.log("idbuild = " + idbuild);

    let sql =
      "SELECT *,boxs.id AS idboxs,customer.id AS idcus ,boxs.debit As debit ";
    sql += ",boxs.status As boxsstatus ";
    sql += "FROM boxs ";
    sql += "LEFT JOIN customer ON boxs.idcustomer = customer.id ";
    sql += "LEFT JOIN build ON boxs.idbuild = build.id ";
    sql += "LEFT JOIN zone ON boxs.idzone = zone.id ";
    sql += "LEFT JOIN payrecord ON boxs.id = payrecord.idboxs ";
    sql += "WHERE boxs.idzone = ? AND boxs.idbuild = ? ";
    sql += "GROUP BY boxs.id ";
    sql += "ORDER BY boxs.idorder ASC";

    // console.log(sql);

    conn.query(sql, [idzone, idbuild], (err, resp) => {
      if (err) {
        console.log("[mysql error]", err);
      }
      // console.log(resp);
      data = resp;
      if (resp.length > 0) {
        mapData();
      } else {
        sendData(0);
      }
    });
  }

  function mapData() {
    let today = moment().format("YYYY-MM-DD");
    let statusToday = 0;

    let totalAllPay = 0;
    let pricepay = 0;
    let toalBackdebit = 0;

    let mData = data.map((item) => {
      let b = moment(item.curdate);
      let a = moment();
      let unitdate = a.diff(b, "days");

      let totalpay = item.price * unitdate - item.overpay;
      totalAllPay += totalpay;

      let backdebit = 0;
      // ค้างยกมา

      // รวมค้างยกมา
      if (moment(item.nowdate).format("YYYY-MM-DD") == today) {
        pricepay = item.pricepay;
        backdebit = totalpay - item.price + item.nowpaid;
      } else {
        pricepay = 0;
        backdebit = totalpay - item.price;
      }

      toalBackdebit = toalBackdebit + backdebit;

      //**** เช็คจ่ายแล้ว วันนี้ */
      if (today == moment(item.nowdate).format("YYYY-MM-DD")) {
        statusToday = 1;
      } else {
        statusToday = 0;
      }
      //**** เช็คจ่ายแล้ว วันนี้ */

      return {
        idcus: item.idcustomer,
        name: item.name + " " + item.lastname,
        tel: item.tel,
        price: item.price,
        unitdate: unitdate,
        totalpay: totalpay,
        namepanel: item.namepanel,
        curdate: moment(item.curdate).format("DD-MM-YYYY"),
        idboxs: item.idboxs,
        overpay: item.overpay,
        debit: item.debit,
        backdebit: backdebit,
        re_debit: item.re_debit,
        pricepay: pricepay,
        nowdate: item.nowdate,
        nowpaid: item.nowpaid,
        statustoday: statusToday,
        idorder: item.idorder,
        boxsstatus: item.boxsstatus,
      };
    });
    data = mData;
    totalnowpaid(toalBackdebit);
  }

  function totalnowpaid(toalBackdebit) {
    let valtotalnowpaid = 0; // ยอดรวมจ่ายวันนี้
    for (let i = 0; i < data.length; i++) {
      if (data[i].statustoday == 1) {
        valtotalnowpaid = valtotalnowpaid + data[i].nowpaid;
      }
      if (i == data.length - 1) {
        fnTotalunit(toalBackdebit, valtotalnowpaid);
      }
    }
  }

  function fnTotalunit(toalBackdebit, valtotalnowpaid) {
    let idzone = req.query.idzone;
    let idbuild = req.query.idbuild;
    let sql = "SELECT COUNT(*) As totalunit FROM customer ";
    sql += "INNER JOIN boxs ON boxs.idcustomer = customer.id ";
    sql += "LEFT JOIN build ON boxs.idbuild = build.id ";
    sql += "LEFT JOIN zone ON boxs.idzone = zone.id ";
    sql += "WHERE boxs.idzone = ? AND boxs.idbuild = ?";

    conn.query(sql, [idzone, idbuild], (err, resp) => {
      if (err) {
        console.log("[mysql error]", err);
      }
      // console.log(resp);
      // totalunit
      totalunit = resp[0].totalunit;
      total(toalBackdebit, valtotalnowpaid);
    });
  }

  function total(toalBackdebit, valtotalnowpaid) {
    let totalpay = 0; // ค่าเช่าทั้งหมด
    let totalpaied = 0;
    let totalpanelprice = 0;
    for (let i = 0; i < data.length; i++) {
      totalpay += data[i].totalpay;
      totalpanelprice += data[i].price;
      totalpaied += data[i].pricepay;
      if (i == data.length - 1) {
        sendData(
          commaNumber(toalBackdebit),
          commaNumber(valtotalnowpaid),
          commaNumber(totalpay),
          commaNumber(totalpaied),
          commaNumber(totalpanelprice)
        );
      }
    }
  }

  function sendData(
    toalBackdebit,
    totalnowpaid,
    totalpay,
    totalpaied,
    totalpanelprice
  ) {
    // console.log(data[0]);
    // console.log("total = " + totalpay);
    res.send({
      data,
      toalBackdebit,
      totalpay,
      totalpaied,
      nowdate,
      totalnowpaid,
      totalpanelprice,
    });
  }
});

router.get("/listcustomerforpanelpay", (req, res) => {
  let panel = req.query.panel;
  panel = "%" + panel + "%";
  let data = [];
  let nowdate = moment().format("YYYY-MM-DD");

  let totalunit = 0;

  let sql =
    "SELECT *,customer.id As idcus,boxs.id As idboxs ,boxs.debit As debit  ";
  sql += ",boxs.status As boxsstatus ";
  sql += "FROM boxs ";
  sql += "LEFT JOIN customer ON boxs.idcustomer = customer.id ";
  sql += "LEFT JOIN build ON boxs.idbuild = build.id ";
  sql += "LEFT JOIN zone ON boxs.idzone = zone.id ";
  sql += "WHERE boxs.namepanel LIKE ? ";
  sql += "group by boxs.id ";
  sql += "ORDER BY boxs.idorder ASC";

  // console.log(sql);

  conn.query(sql, [panel], (err, resp) => {
    if (err) {
      console.log("[mysql error]", err);
    }
    // console.log(resp[0]);
    data = resp;
    if (resp.length > 0) {
      mapData();
    } else {
      sendData(0);
    }
  });

  function mapData() {
    let today = moment().format("YYYY-MM-DD");
    let statusToday = 0;
    let totalAllPay = 0;
    let pricepay = 0;
    let toalBackdebit = 0;

    let mData = data.map((item) => {
      let today = moment().format("YYYY-MM-DD");
      let b = moment(item.curdate);
      let a = moment();

      let unitdate = a.diff(b, "days");
      // unitdate = Math.abs(unitdate);
      let totalpay = item.price * unitdate - item.overpay;
      totalAllPay += totalpay;

      let backdebit = 0;
      // ค้างยกมา

      // รวมค้างยกมา
      if (moment(item.nowdate).format("YYYY-MM-DD") == today) {
        pricepay = item.pricepay;
        backdebit = totalpay - item.price + item.nowpaid;
      } else {
        pricepay = 0;
        backdebit = totalpay - item.price;
      }

      toalBackdebit = toalBackdebit + backdebit;

      //**** เช็คจ่ายแล้ว วันนี้ */
      if (today == moment(item.nowdate).format("YYYY-MM-DD")) {
        statusToday = 1;
      } else {
        statusToday = 0;
      }
      //**** เช็คจ่ายแล้ว วันนี้ */

      return {
        idcus: item.idcustomer,
        name: item.name + " " + item.lastname,
        tel: item.tel,
        price: item.price,
        unitdate: unitdate,
        totalpay,
        namepanel: item.namepanel,
        curdate: moment(item.curdate).format("DD-MM-YYYY"),
        idboxs: item.idboxs,
        overpay: item.overpay,
        debit: item.debit,
        backdebit: backdebit,
        re_debit: item.re_debit,
        pricepay: pricepay,
        nowdate: item.nowdate,
        nowpaid: item.nowpaid,
        statustoday: statusToday,
        idorder: item.idorder,
        boxsstatus: item.boxsstatus,
      };
    });
    data = mData;
    totalnowpaid(toalBackdebit);
  }

  function totalnowpaid(toalBackdebit) {
    let valtotalnowpaid = 0; // ยอดรวมจ่ายวันนี้
    for (let i = 0; i < data.length; i++) {
      if (data[i].statustoday == 1) {
        valtotalnowpaid = valtotalnowpaid + data[i].nowpaid;
      }
      if (i == data.length - 1) {
        total(toalBackdebit, valtotalnowpaid);
      }
    }
  }

  function total(toalBackdebit, valtotalnowpaid) {
    let totalpay = 0; // ค่าเช่าทั้งหมด
    let totalpaied = 0;
    let totalpanelprice = 0;
    for (let i = 0; i < data.length; i++) {
      totalpay += data[i].totalpay;
      totalpanelprice += data[i].price;
      totalpaied += data[i].pricepay;
      if (i == data.length - 1) {
        sendData(
          commaNumber(toalBackdebit),
          commaNumber(valtotalnowpaid),
          commaNumber(totalpay),
          commaNumber(totalpaied),
          commaNumber(totalpanelprice)
        );
      }
    }
  }

  function sendData(
    toalBackdebit,
    totalnowpaid,
    totalpay,
    totalpaied,
    totalpanelprice
  ) {
    // console.log(data);
    // console.log("total = " + totalpay);
    res.send({
      data,
      toalBackdebit,
      totalpay,
      totalpaied,
      nowdate,
      totalnowpaid,
      totalpanelprice,
    });
  }

  // function fnTotalunit() {
  //   let panel = req.query.panel;
  //   panel = "%" + panel + "%";
  //   let sql = "SELECT COUNT(*) As totalunit FROM customer ";
  //   sql += "LEFT JOIN boxs ON boxs.idcustomer = customer.id ";
  //   sql += "LEFT JOIN build ON boxs.idbuild = build.id ";
  //   sql += "LEFT JOIN zone ON boxs.idzone = zone.id ";
  //   sql += "WHERE boxs.namepanel LIKE ?";

  //   conn.query(sql, [panel], (err, resp) => {
  //     if (err) {
  //       console.log("[mysql error]", err);
  //     }
  //     totalunit = resp[0].totalunit;
  //     total();
  //   });
  // }

  // function total() {
  //   let totalpay = 0;
  //   for (let i = 0; i < data.length; i++) {
  //     totalpay += data[i].totalpay;
  //     if (i == data.length - 1) {
  //       sendData(totalpay);
  //     }
  //   }
  // }

  // function sendData(totalpay) {
  //   console.log("totalunit = " + totalunit);
  //   res.send({ data, totalpay, totalunit });
  // }
});

// Check User Scan
router.get("/checkuserscan", (req, res) => {
  // console.log("checkuserscan");
  // console.log("id = " + req.query.id);
  // console.log("iduser = " + req.query.iduser);

  async function main() {
    await getBuildAndZone();
  }
  main();

  function getBuildAndZone() {
    let idboxs = req.query.id;
    let sql = "SELECT id,idbuild,idzone FROM boxs WHERE id = ?";
    conn.query(sql, [idboxs], (err, resp) => {
      if (err) {
        console.log("[mysql err]", err);
      }
      // console.log(resp[0]);
      if (resp.length > 0) {
        dataBuildZone = resp;
        checkRole();
      } else {
        dataBuildZone = { id: 0, idbuild: 0, idzone: 0 };
        res.send({ datalength: 0 });
      }
    });
  }

  function checkRole() {
    // console.log("************");
    // console.log(dataBuildZone);
    let iduser = req.query.iduser;
    let sql = "SELECT * FROM role ";
    sql += "WHERE idstaff = ? AND idbuild = ? AND idzone = ? AND status = 1";
    conn.query(
      sql,
      [iduser, dataBuildZone[0].idbuild, dataBuildZone[0].idzone],
      (err, resp) => {
        if (err) {
          console.log("[mysql err]", err);
        }
        // console.log("resplenght = " + resp.length);
        sendData(resp.length);
      }
    );
  }

  function sendData(datalength) {
    // console.log(datalength);
    res.send({ datalength });
  }
});

router.get("/selectboxspay", (req, res) => {
  // console.log("TEST");
  let data = [];
  async function main() {
    getData();
  }
  main();

  function getData() {
    let id = req.query.id;

    let sql = "SELECT *,customer.id As idcus,boxs.id As idboxs FROM boxs ";
    sql += "INNER JOIN customer ON boxs.idcustomer = customer.id ";
    sql += "LEFT JOIN build ON boxs.idbuild = build.id ";
    sql += "LEFT JOIN zone ON boxs.idzone = zone.id ";
    sql += "WHERE boxs.id = ? ";
    // console.log(sql);
    conn.query(sql, [id], (err, resp) => {
      if (err) {
        console.log("[mysql error]", err);
      }
      // console.log(resp);
      data = resp;
      mapData();
    });
  }

  function mapData() {
    let mData = data.map((item) => {
      let b = moment(item.curdate);
      let a = moment();
      let unitdate = a.diff(b, "days");
      // unitdate = Math.abs(unitdate);
      let totalpay = item.price * unitdate - item.overpay;

      let today = moment().format("YYYY-MM-DD");
      let statusToday = 0;

      if (today == moment(item.nowdate).format("YYYY-MM-DD")) {
        statusToday = 1;
      } else {
        statusToday = 0;
      }

      return {
        idboxs: item.idboxs,
        // idboxs: item.id,
        idcus: item.idcustomer,
        name: item.name + " " + item.lastname,
        tel: item.tel,
        price: item.price,
        unitdate: unitdate,
        totalpay,
        namepanel: item.namepanel,
        curdate: moment(item.curdate).format("DD-MM-YYYY"),
        overpay: item.overpay,
        debit: item.debit,
        statustoday: statusToday,
        nowpaid: item.nowpaid,
      };
    });
    data = mData;
    sendData();
  }

  function sendData() {
    // console.log(data[0]);
    res.send(data);
  }
});

router.post("/savedebitpay", (req, res) => {
  // console.log("savedebitpay");
  let gOverPay = 0;
  function main() {
    getOverPay();
  }
  main();

  function getOverPay() {
    // อ่านเงินเกินชำระ
    let id = req.body.idboxs;
    // console.log("idboxs =" + id);
    let sql = "SELECT overpay FROM boxs ";
    sql += "WHERE id = ?";
    conn.query(sql, [id], (err, resp) => {
      if (err) {
        console.log("[mysql error]", err);
      }
      gOverPay = resp[0].overpay;
      // console.log(resp);
      fnUpdateDebit();
    });
  }

  function fnUpdateDebit() {
    // บันทึกยอดค้างเดิม
    let id = req.body.idboxs;
    let val = req.body.val; // ยอดคงค้าง
    let newDebit = val - gOverPay; // ยอดค้าง - เงินเกิน
    // console.log("id = " + id);
    // console.log("newDebit = " + newDebit);
    let sql = "UPDATE boxs SET debit = ? ";
    sql += "WHERE id = ?";
    conn.query(sql, [newDebit, id], (err, resp) => {
      if (err) {
        console.log("[mysql error]", err);
      }
      fnClearOverpay();
    });
  }

  function fnClearOverpay() {
    // ล้างเงืนเกิน
    let id = req.body.idboxs;
    let sql = "UPDATE boxs SET overpay = 0 WHERE id = ?";
    conn.query(sql, [id], (err, resp) => {
      if (err) {
        console.log("[mysql err]", err);
      }
      fnUpdateLastDate();
    });
  }

  function fnUpdateLastDate() {
    // อัฟเดทวันจ่ายล่าสุด
    let id = req.body.idboxs;
    let nowdate = moment().format("YYYY-MM-DD");
    let sql = "UPDATE boxs SET curdate = ? ";
    sql += "WHERE id = ?";
    conn.query(sql, [nowdate, id], (err, resp) => {
      if (err) {
        console.log("[mysql err]".err);
      }
      sendData();
    });
  }

  function sendData() {
    res.end();
  }
});

router.get("/listcustomerforname", (req, res) => {
  // ค้นหา Customer ด้วยชื่อ

  let name = req.query.name;
  name = "%" + name + "%";

  let sql = "SELECT *,customer.id As idcus FROM customer ";
  sql += "LEFT JOIN boxs ON boxs.idcustomer = customer.id ";
  sql += "LEFT JOIN build ON boxs.idbuild = build.id ";
  sql += "LEFT JOIN zone ON boxs.idzone = zone.id ";
  sql += "WHERE name LIKE ?";
  // console.log(sql);

  conn.query(sql, [name], (err, resp) => {
    if (err) {
      console.log("[mysql error]", err);
    }
    res.send(resp);
  });
});

router.get("/listcustomerforpanel", (req, res) => {
  let panel = req.query.panel;

  let sql = "SELECT *,customer.id As idcus FROM customer ";
  sql += "LEFT JOIN boxs ON boxs.idcustomer = customer.id ";
  sql += "LEFT JOIN build ON boxs.idbuild = build.id ";
  sql += "LEFT JOIN zone ON boxs.idzone = zone.id ";
  sql += "WHERE boxs.namepanel = ?";
  // console.log(sql);

  conn.query(sql, [panel], (err, resp) => {
    if (err) {
      console.log("[mysql error]", err);
    }
    // console.log(resp[0]);
    res.send(resp);
  });
});

router.get("/listcustomerforidcard", (req, res) => {
  // ค้นหา Customer ด้วยชื่อ

  let idcard = req.query.idcard;
  idcard = "%" + idcard + "%";

  let sql = "SELECT *,customer.id As idcus FROM customer ";
  sql += "LEFT JOIN boxs ON boxs.idcustomer = customer.id ";
  sql += "LEFT JOIN build ON boxs.idbuild = build.id ";
  sql += "LEFT JOIN zone ON boxs.idzone = zone.id ";
  sql += "WHERE cardid LIKE ?";
  // console.log(sql);

  conn.query(sql, [idcard], (err, resp) => {
    if (err) {
      console.log("[mysql error]", err);
    }
    // console.log(resp);
    res.send(resp);
  });
});

router.get("/selectcustomer", (req, res) => {
  let id = req.query.id;
  let sql = "SELECT * FROM customer WHERE id = ?";
  conn.query(sql, [id], (err, resp) => {
    // console.log(resp);
    res.send(resp);
  });
});

router.post("/editcustomer", (req, res) => {
  // console.log("edit customer");
  let sql = "UPDATE customer SET ";
  sql += "nickname = ?,";
  sql += "name = ?,";
  sql += "lastname = ?,";
  sql += "address = ?,";
  sql += "cardid = ?,";
  sql += "tel = ?,";
  sql += "tumbol = ?,";
  sql += "aumpur = ?,";
  sql += "provinc = ?,";
  sql += "zipcode = ? ";
  sql += "WHERE id = ?";

  conn.query(
    sql,
    [
      req.body.nickname,
      req.body.name,
      req.body.lastname,
      req.body.address,
      req.body.cardid,
      req.body.tel,
      req.body.subdist,
      req.body.dist,
      req.body.province,
      req.body.zipcode,
      req.body.id,
    ],
    (err, resp) => {
      if (err) {
        console.log("[mysql err]", err);
      }
      res.end();
    }
  );
});

router.post("/delcustomer", (req, res) => {
  async function main() {
    await fnDelCustomer();
  }
  main();

  function fnDelCustomer() {
    let id = req.body.id;
    // console.log("id = " + id);
    let sql = "DELETE FROM customer WHERE id = ? ";
    conn.query(sql, [id], (err, resp) => {
      if (err) {
        console.log("[mysql err]", err);
      }
      fnDelCustomerForLock();
    });
  }

  function fnDelCustomerForLock() {
    let id = req.body.id;
    let sql = "UPDATE boxs SET idcustomer = 0 WHERE idcustomer = ? ";
    conn.query(sql, [id], (err, resp) => {
      if (err) {
        console.log("[mysql err]", err);
      }
      fnSendData();
    });
  }

  function fnSendData() {
    res.end();
  }
});

router.post("/uploadmap", (req, res) => {
  let golNamePic = "";
  function main() {
    getData();
  }
  main();

  function getData() {
    // console.log(req.files.picture);
    // console.log(req.body.namemap);
    uploaddata();
  }

  function uploaddata() {
    if (req.body.picture === "null") {
      sendData();
    } else {
      // console.log("test");
      if (!req.files || Object.keys(req.files).length === 0) {
        // return res.status(400).send("No files were uploaded.");
        sendData();
      } else {
        let newname = req.files.picture.name;
        let blobfile = req.files.picture;
        let timePic = moment().format("YY_MM_DD_HH_mm_ss");
        let namePic = timePic + newname;
        golNamePic = namePic;
        // Use the mv() method to place the file somewhere on your server
        blobfile.mv("./public/map/" + namePic, function (err) {
          if (err) return res.status(500).send(err);
          // conn.query(sql, [idProduct, namePic, 1], (err, resIns) => {
          if (err) {
            console.log("[mysql error]", err);
          }
          addMap();
          // });
        });
      }
    }
  }

  function addMap() {
    let name = req.body.namemap;
    let sql = "INSERT INTO map (namemap,picture,status) VALUES(?,?,?)";
    conn.query(sql, [name, golNamePic, 1], (err, resp) => {
      if (err) {
        console.log("[mysql error]", err);
      }
      sendData();
    });
  }

  function sendData() {
    res.end();
  }
});

router.get("/listmap", (req, res) => {
  let sql = "SELECT * FROM map";
  conn.query(sql, (err, resp) => {
    if (err) {
      console.log("[mysql error]", err);
    }
    // console.log(resp);
    res.send(resp);
  });
});

router.post("/savemap", (req, res) => {
  let data = req.body.data;
  // console.log(data.length);
  // console.log(data);
  let build = req.body.build;
  let zone = req.body.zone;
  // console.log("build = " + build + " zone = " + zone);
  function main() {
    checkbuildAndZone();
  }
  main();

  function checkbuildAndZone() {
    let sql = "DELETE FROM boxs WHERE idbuild = ? AND idzone = ? ";
    conn.query(sql, [build, zone], (err, resp) => {
      if (err) {
        console.log("[mysql err]", err);
      }
      getData();
    });
  }

  function getData() {
    let sql =
      "INSERT INTO boxs (x,y,w,h,color,idbuild,idzone,namepanel,status) ";
    sql += "VALUES(?,?,?,?,?,?,?,?,?)";
    for (let i = 0; i < data.length; i++) {
      conn.query(
        sql,
        [
          data[i].x,
          data[i].y,
          data[i].w,
          data[i].h,
          data[i].color,
          build,
          zone,
          data[i].namepanel,
          1,
        ],
        (err, resp) => {
          if (err) {
            console.log("[mysql err]", err);
          }
        }
      );
      if (i == data.length - 1) {
        sendData();
      }
    }
  }

  function sendData() {
    // console.log("END");
    res.end();
  }
});

router.get("/loadboxs", (req, res) => {
  let idbuild = req.query.idbuild;
  let idzone = req.query.idzone;
  let data = [];

  // console.log("idbuild = " + idbuild + " idzone = " + idzone);
  let sql =
    "SELECT * FROM boxs WHERE idbuild = ? AND idzone = ? AND status = 1";
  conn.query(sql, [idbuild, idzone], (err, resp) => {
    if (err) {
      console.log("[mysql err]", err);
    }
    // console.log(resp);
    data = resp;
    mapData();
  });

  function mapData() {
    let mData = data.map((item) => {
      return {
        id: item.id,
        uuid: item.uuid,
        x: item.x,
        y: item.y,
        w: item.w,
        h: item.h,
        color: item.color,
        idbuild: item.idbuild,
        idzone: item.idzone,
        namepanel: item.namepanel,
        rate: item.rate,
        idcustomer: item.idcustomer,
        price: item.price,
        status: item.status,
        recog: item.recog,
        recogdate: moment(item.recogdate).format("YYYY-MM-DD"),
        curdate: moment(item.curdate).format("YYYY-MM-DD"),
        startdate: moment(item.startdate).format("YYYY-MM-DD"),
      };
    });
    data = mData;
    sendData();
  }

  function sendData() {
    // console.log(data[0]);
    res.send(data);
  }
});

router.get("/selectmap", (req, res) => {
  let id = req.query.id;
  // console.log("id = " + id);
  sql = "SELECT * FROM map WHERE id = ?";
  conn.query(sql, [id], (err, resp) => {
    if (err) {
      console.log("[mysql err]", err);
    }
    res.send(resp);
  });
});

router.post("/addlock", (req, res) => {
  // let data = req.body;
  // console.log(data);
  async function main() {
    await getData();
  }
  main();

  function getData() {
    let id = req.body.idboxs;
    let name = req.body.namelock;
    let price = req.body.price;
    let recog = req.body.recog;
    let recogdate = req.body.recogdate;
    let paydate = req.body.paydate;

    let sql = "UPDATE boxs SET namepanel = ?,price = ?,";
    sql += "recog = ?,recogdate=?,curdate =?,startdate = ? ";
    sql += "WHERE id = ? ";
    conn.query(
      sql,
      [name, price, recog, recogdate, paydate, paydate, id],
      (err, resp) => {
        if (err) {
          console.log("[mysql err]", err);
        }
        sendData();
      }
    );
  }

  function sendData() {
    res.end();
  }
});

// ค้นหาแผง
router.get("/panelsearch", (req, res) => {
  let data = [];

  async function main() {
    getData();
  }
  main();

  function getData() {
    let idbuild = req.query.idbuild;
    let idzone = req.query.idzone;
    // console.log(idbuild);
    let sql = "SELECT *,customer.id As idcustomer,boxs.id As idboxs FROM boxs ";
    sql += "INNER JOIN build ON boxs.idbuild = build.id ";
    sql += "INNER JOIN zone ON boxs.idzone = zone.id ";
    sql += "LEFT JOIN customer ON boxs.idcustomer = customer.id ";
    sql += "WHERE 1 ";
    sql += "AND idbuild = ? ";
    sql += "AND idzone = ? ";
    sql += "AND namepanel != '' ";
    sql += "ORDER BY namepanel ASC";
    conn.query(sql, [idbuild, idzone], (err, resp) => {
      if (err) {
        console.log("[mysql err]", err);
      }
      // console.log(resp[0]);
      data = resp;
      sendData();
    });
  }

  function sendData() {
    res.send(data);
  }
});

// ค้นหาชื่อแผง
router.get("/panelsearchname", (req, res) => {
  let data = [];

  async function main() {
    getData();
  }
  main();

  function getData() {
    let namepanel = req.query.name;
    namepanel = "%" + namepanel + "%";
    // console.log(idbuild);
    let sql = "SELECT *,customer.id As idcustomer,boxs.id As idboxs FROM boxs ";
    sql += "INNER JOIN build ON boxs.idbuild = build.id ";
    sql += "INNER JOIN zone ON boxs.idzone = zone.id ";
    sql += "LEFT JOIN customer ON boxs.idcustomer = customer.id ";
    sql += "WHERE 1 ";
    sql += "AND namepanel LIKE ? ";
    sql += "AND namepanel != '' ";
    sql += "ORDER BY namepanel ASC";
    conn.query(sql, [namepanel], (err, resp) => {
      if (err) {
        console.log("[mysql err]", err);
      }
      // console.log(resp[0]);
      data = resp;
      sendData();
    });
  }

  function sendData() {
    res.send(data);
  }
});

router.post("/seveeditprice", (req, res) => {
  // console.log(req.body);
  let id = req.body.idboxs;
  let valprice = req.body.valprice;

  let sql = "UPDATE boxs SET price = ? ";
  sql += "WHERE id = ?";
  conn.query(sql, [valprice, id], (err, resp) => {
    if (err) {
      console.log("[mysql err]", err);
    }
    res.end();
  });
});

router.get("/searchidcustomer", (req, res) => {
  let idcard = req.query.id;
  idcard = "%" + idcard + "%";
  // console.log("idcard = " + idcard);
  let sql = "SELECT * ,subdistrict.name_th As tumbolname,";
  sql += "district.name_th As aumpurname,";
  sql += "provinces.name_th As provincename ";
  sql += "FROM customer ";
  sql += "Left JOIN district ON customer.aumpur = district.`code` ";
  sql += "Left JOIN provinces ON customer.provinc = provinces.`code` ";
  sql += "left JOIN subdistrict ON customer.tumbol = subdistrict.`code` ";
  sql += "WHERE cardid LIKE ?";
  conn.query(sql, [idcard], (err, resp) => {
    if (err) {
      console.log("[mysql err]", err);
    }
    // console.log(resp);
    res.send(resp);
  });
});

router.get("/searchnamecustomer", (req, res) => {
  let name = req.query.name;
  name = "%" + name + "%";
  // console.log("idcard = " + idcard);
  let sql = "SELECT * ,subdistrict.name_th As tumbolname,";
  sql += "district.name_th As aumpurname,";
  sql += "provinces.name_th As provincename ";
  sql += "FROM customer ";
  sql += "Left JOIN district ON customer.aumpur = district.`code` ";
  sql += "Left JOIN provinces ON customer.provinc = provinces.`code` ";
  sql += "left JOIN subdistrict ON customer.tumbol = subdistrict.`code` ";
  sql += "WHERE customer.name LIKE ?";
  conn.query(sql, [name], (err, resp) => {
    if (err) {
      console.log("[mysql err]", err);
    }
    // console.log(resp);
    res.send(resp);
  });
});

router.post("/createsaveboxs", (req, res) => {
  let data = req.body.data;
  let build = req.body.build;
  let zone = req.body.zone;
  let uuuid = uuid.v1();
  // console.log("xxxx");
  // console.log(data[0].x);

  let sql = "INSERT INTO boxs ";
  sql += "(uuid,x,y,w,h,color,idbuild,idzone,namepanel,status) ";
  sql += "VALUES(?,?,?,?,?,?,?,?,?,?)";

  conn.query(
    sql,
    [
      uuuid,
      data[0].x,
      data[0].y,
      data[0].w,
      data[0].h,
      data[0].color,
      build,
      zone,
      data[0].namepanel,
      1,
    ],
    (err, resp) => {
      if (err) {
        console.log("[mysql err]", err);
      }
      res.end();
    }
  );
});

router.post("/delsaveboxs", (req, res) => {
  let id = req.body.id;
  // console.log("id = " + id);
  let sql = "DELETE FROM boxs WHERE id = ? ";
  conn.query(sql, [id], (err, resp) => {
    if (err) {
      console.log("[mysql err]", err);
    }
    res.end();
  });
});

// แก้สี Boxs
router.get("/selectmode", (req, res) => {
  // console.log("select mode ");
  let id = req.query.id;
  let color = req.query.color;

  let sql = "UPDATE boxs SET color = ? ";
  sql += "WHERE id = ? ";
  conn.query(sql, [color, id], (err, resp) => {
    if (err) {
      console.log("[mysql err]", err);
    }
    res.end();
  });
});

// แก้สี Boxs กลับ
router.get("/beforselectmode", (req, res) => {
  let id = req.query.id;
  let color = "#4caf5094"; // เขียว

  let sql = "UPDATE boxs SET color = ? ";
  sql += "WHERE id = ? ";
  conn.query(sql, [color, id], (err, resp) => {
    if (err) {
      console.log("[mysql err]", err);
    }
    res.end();
  });
});

router.post("/addcutomerandpanel", (req, res) => {
  let idcustomer = req.body.idcustomer;
  let idboxs = req.body.idboxs;
  // console.log("idcustomer = " + idcustomer);
  // console.log("idboxs = " + idboxs);
  let sql = "UPDATE boxs SET idcustomer = ? ";
  sql += "WHERE id = ? ";
  conn.query(sql, [idcustomer, idboxs], (err, resp) => {
    if (err) {
      console.log("[mysql err]", err);
    }
    res.end();
  });
});

router.get("/seletecutomerformboxs", (req, res) => {
  let idboxs = req.query.idboxs;
  let sql = "SELECT *";
  sql += ",customer.id As idcustomer";
  sql += ",boxs.id As idboxs";
  sql += ",subdistrict.name_th As tumbolname";
  sql += ",district.name_th As aumpurname";
  sql += ",provinces.name_th As provincename ";
  sql += "FROM customer ";
  sql += "INNER JOIN boxs ON customer.id = boxs.idcustomer ";
  sql += "LEFT JOIN provinces ON customer.provinc = provinces.`code` ";
  sql += "LEFT JOIN subdistrict ON customer.tumbol = subdistrict.`code` ";
  sql += "LEFT JOIN district ON customer.aumpur = district.`code` ";
  sql += "WHERE boxs.id = ?";

  conn.query(sql, [idboxs], (err, resp) => {
    if (err) {
      console.log("[mysql err]", err);
    }
    // console.log(resp);
    res.send(resp);
  });
});

router.get("/listcustomerforidbuildandzone", (req, res) => {
  let data = [];
  async function main() {
    await getData();
  }
  main();

  function getData() {
    let idzone = req.query.idzone;
    let idbuild = req.query.idbuild;
    // console.log("idzone = " + idzone);
    // console.log("idbuild = " + idbuild);

    let sql = "SELECT *,customer.id As idcus FROM customer ";
    sql += "LEFT JOIN boxs ON boxs.idcustomer = customer.id ";
    sql += "LEFT JOIN build ON boxs.idbuild = build.id ";
    sql += "LEFT JOIN zone ON boxs.idzone = zone.id ";
    sql += "WHERE boxs.idzone = ? AND boxs.idbuild = ?";

    conn.query(sql, [idzone, idbuild], (err, resp) => {
      if (err) {
        console.log("[mysql error]", err);
      }
      data = resp;
      sendData();
    });
  }

  function sendData() {
    // console.log(data[0]);
    res.send(data);
  }
});

router.post("/payday", (req, res) => {
  // console.log("pay day");
  let curdate = "";
  let oldpay = 0;
  let g_idUser = 0;

  async function main() {
    await getCurDate();
  }
  main();

  function getCurDate() {
    let id = req.body.idboxs;
    let sql = "SELECT curdate FROM boxs WHERE id = ?";
    conn.query(sql, [id], (err, resp) => {
      if (err) {
        console.log("[mysql err]", err);
      }
      let date = resp[0].curdate;
      let new_date = moment(date, "DD-MM-YYYY");
      curdate = new_date.add(1, "days"); // Update เพิ่ม 1 วัน
      curdate = moment(curdate).format("YYYY-MM-DD");
      updateCurDate();
    });
  }

  function updateCurDate() {
    // Update เพิ่ม 1 วัน
    let id = req.body.idboxs;
    let sql = "UPDATE boxs SET curdate = ? ";
    sql += "WHERE id = ?";
    conn.query(sql, [curdate, id], (err, resp) => {
      if (err) {
        console.log("[mysql err]", err);
      }
      getUser();
    });
  }

  // ค้นหา User
  function getUser() {
    // console.log("getUser");
    let username = req.body.username;
    let sql = "SELECT * FROM staff WHERE username = ? ";
    conn.query(sql, [username], (err, resp) => {
      if (err) {
        console.log("[mysql err]", err);
      }
      // console.log(resp[0].id);
      g_idUser = resp[0].id;
      savepayrecord();
    });
  }

  // 6/7/2566 update payrecord
  function savepayrecord() {
    // check table payrecord
    let nowdate = moment().format("YYYY-MM-DD");
    let idboxs = req.body.idboxs;

    let sql = "SELECT * FROM payrecord WHERE idboxs = ? AND datepay = ? ";
    conn.query(sql, [idboxs, nowdate], (err, resp) => {
      if (err) {
        console.log("[mysql err]", err);
      }
      // console.log(resp.length);
      if (resp.length > 0) {
        fnGetOlePricePay();
      } else {
        fnInsertPayrecord();
      }
    });
  }

  function fnGetOlePricePay() {
    // console.log("fnGet");
    let nowdate = moment().format("YYYY-MM-DD");
    let idboxs = req.body.idboxs;

    let sql = "SELECT * FROM payrecord ";
    sql += "WHERE idboxs = ? AND datepay = ? ";
    conn.query(sql, [idboxs, nowdate], (err, resp) => {
      if (err) {
        console.log("[mysql err]", err);
      }
      oldpay = resp[0].pricepay; // Pull ที่จ่ายแล้ววันนี้
      fnUpdatePrice();
    });
  }

  function fnUpdatePrice() {
    // console.log("oldpay = " + oldpay);
    let selectpay = req.body.selectpay;
    let newpay = parseFloat(oldpay) + parseFloat(selectpay);
    let nowdate = moment().format("YYYY-MM-DD");
    let idboxs = req.body.idboxs;

    let sql = "UPDATE payrecord SET pricepay = ?,idstaff = ? ";
    sql += "WHERE idboxs = ? AND datepay = ?";
    conn.query(sql, [newpay, g_idUser, idboxs, nowdate], (err, resp) => {
      if (err) {
        console.log("[mysql err]", err);
      }
      updateboxNow();
    });
  }

  function fnInsertPayrecord() {
    let selectpay = req.body.selectpay;
    let nowdate = moment().format("YYYY-MM-DD");
    let idboxs = req.body.idboxs;
    let sql = "INSERT INTO payrecord (datepay,pricepay,idboxs,idstaff) ";
    sql += "VALUES(?,?,?,?)";
    conn.query(sql, [nowdate, selectpay, idboxs, g_idUser], (err, resp) => {
      if (err) {
        console.log("[mysql err]", err);
      }
      updateboxNow();
    });
  }

  function updateboxNow() {
    let nowdate = moment().format("YYYY-MM-DD");
    let selectpay = req.body.selectpay;
    let newpay = parseFloat(oldpay) + parseFloat(selectpay);
    let idboxs = req.body.idboxs;

    let sql = "UPDATE boxs SET nowdate = ? , nowpaid = ? ";
    sql += "WHERE id = ?";
    conn.query(sql, [nowdate, newpay, idboxs], (err, resp) => {
      if (err) {
        console.log("[mysql err]", err);
      }
      sendData();
    });
  }

  function sendData() {
    res.end();
  }
});

router.post("/payall", (req, res) => {
  // console.log("pay all");
  let curdate = "";
  let oldpay = 0;
  let g_idUser = 0;

  async function main() {
    await updateCurDate();
  }
  main();
  function updateCurDate() {
    let id = req.body.idboxs;
    let nowdate = moment().format("YYYY-MM-DD");
    let sql = "UPDATE boxs SET curdate = ? ";
    sql += "WHERE id = ?";
    conn.query(sql, [nowdate, id], (err, resp) => {
      if (err) {
        console.log("[mysql err]", err);
      }
      getUser();
    });
  }

  // ค้นหา User
  function getUser() {
    // console.log("getUser");
    let username = req.body.username;
    let sql = "SELECT * FROM staff WHERE username = ? ";
    conn.query(sql, [username], (err, resp) => {
      if (err) {
        console.log("[mysql err]", err);
      }
      // console.log(resp[0].id);
      g_idUser = resp[0].id;
      savepayrecord();
    });
  }

  // 6/7/2566 update payrecord
  function savepayrecord() {
    // check table payrecord
    let nowdate = moment().format("YYYY-MM-DD");
    let idboxs = req.body.idboxs;

    let sql = "SELECT * FROM payrecord WHERE idboxs = ? AND datepay = ? ";
    conn.query(sql, [idboxs, nowdate], (err, resp) => {
      if (err) {
        console.log("[mysql err]", err);
      }
      // console.log(resp.length);
      if (resp.length > 0) {
        fnGetOlePricePay(); // ถ้ามีข้อมูลอยู่แล้ว เก็บราคาจ่ายเก่า
      } else {
        fnInsertPayrecord();
      }
    });
  }

  function fnGetOlePricePay() {
    // console.log("fnGet");
    let nowdate = moment().format("YYYY-MM-DD");
    let idboxs = req.body.idboxs;

    let sql = "SELECT * FROM payrecord ";
    sql += "WHERE idboxs = ? AND datepay = ? ";
    conn.query(sql, [idboxs, nowdate], (err, resp) => {
      if (err) {
        console.log("[mysql err]", err);
      }
      oldpay = resp[0].pricepay; // Pull ที่จ่ายแล้ววันนี้
      fnUpdatePrice();
    });
  }

  function fnUpdatePrice() {
    // console.log("oldpay = " + oldpay);
    let selectpay = req.body.selectpay;
    let newpay = parseFloat(oldpay) + parseFloat(selectpay);
    // console.log("newpay = " + newpay);
    let nowdate = moment().format("YYYY-MM-DD");
    let idboxs = req.body.idboxs;

    let sql = "UPDATE payrecord SET pricepay = ?,idstaff = ? ";
    sql += "WHERE idboxs = ? AND datepay = ?";
    conn.query(sql, [newpay, g_idUser, idboxs, nowdate], (err, resp) => {
      if (err) {
        console.log("[mysql err]", err);
      }
      updateboxNow();
    });
  }

  function fnInsertPayrecord() {
    let selectpay = req.body.selectpay;
    let nowdate = moment().format("YYYY-MM-DD");
    let idboxs = req.body.idboxs;
    let sql = "INSERT INTO payrecord (datepay,pricepay,idboxs,idstaff) ";
    sql += "VALUES(?,?,?,?)";
    conn.query(sql, [nowdate, selectpay, idboxs, g_idUser], (err, resp) => {
      if (err) {
        console.log("[mysql err]", err);
      }
      updateboxNow(); // Update วันนี้จ่ายแล้ว
    });
  }

  function updateboxNow() {
    // Update วันนี้จ่ายแล้ว
    let nowdate = moment().format("YYYY-MM-DD");
    let selectpay = req.body.selectpay;
    let newpay = parseFloat(oldpay) + parseFloat(selectpay);
    let idboxs = req.body.idboxs;

    let sql = "UPDATE boxs SET nowdate = ? , nowpaid = ? , overpay = 0 ";
    sql += "WHERE id = ?";
    conn.query(sql, [nowdate, newpay, idboxs], (err, resp) => {
      if (err) {
        console.log("[mysql err]", err);
      }
      sendData();
    });
  }

  function sendData() {
    res.end();
  }
});

// จ่ายเป็นตัวเงิน
router.post("/paymoney", (req, res) => {
  console.log("paymoney");
  console.log(req.body);
  let gMoney = 0; // เงินที่ต้องจ่ายต่อ 1 วัน
  let gUnitdate = 0; // จำนวนวันที่จ่ายลงตัว
  let gOverPay = 0; // เงินที่เกินมาจากการจ่ายที่ลงตัว
  let gOverPayOld = 0; // เงินเกินของเก่า
  let gCurdateUpdate = ""; // วันที่ต้องอัฟเดทใหม่
  let gTotalPay = 0; // ยอดเงินเกินเก่า + ยอดเงินเกินใหม่
  let oldpay = 0;
  let g_idUser = 0;

  async function main() {
    await getData();
  }
  main();

  function getData() {
    // หายอดจ่ายรายวัน
    let idboxs = req.body.idboxs;
    let sql = "select price from boxs ";
    sql += "WHERE id = ?";
    conn.query(sql, [idboxs], (err, resp) => {
      if (err) {
        console.log("[mysql err]", err);
      }
      // console.log("ยอดจ่ายรายวัน = " + resp[0].price);
      gMoney = resp[0].price; // หายอดจ่ายรายวัน
      getOverPayOld();
    });
  }

  function getOverPayOld() {
    // รับเงินเกินยอดเก่า
    let id = req.body.idboxs;
    let sql = "SELECT overpay FROM boxs ";
    sql += "WHERE id = ?";
    conn.query(sql, [id], (err, resp) => {
      if (err) {
        console.log("[mysql err]", err);
      }
      gOverPayOld = resp[0].overpay; // รับเงินเกินยอดเก่า
      getUnitDate();
    });
  }

  function getUnitDate() {
    // รวมยอดเกินเก่า + ยอดจ่ายใหม่ / รายวัน  = หาวันที่ลงตัว
    // จำนวนวันที่หารลงตัว
    let selectpay = req.body.selectpay; // จำนวนเงินกรอก
    let id = req.body.idboxs;
    let totaldate = (parseFloat(selectpay) + parseFloat(gOverPayOld)) / gMoney; // เงินกรอก + เงินเกิน / รายวัน
    gTotalPay = parseFloat(selectpay) + parseFloat(gOverPayOld);
    gUnitdate = Math.floor(totaldate);
    // console.log("gUnitdate = " + gUnitdate); // จะได้วันที่ลงตัว
    clearOverPay();
  }

  function clearOverPay() {
    // ลบเงินเกิน 0
    let id = req.body.idboxs;
    let sql = "UPDATE boxs SET overpay = 0 WHERE id = ?";
    conn.query(sql, [id], (err, resp) => {
      if (err) {
        console.log("[mysql err]", err);
      }
      getOverPay();
    });
  }

  function getOverPay() {
    // หาวันที่จ่ายล่าสุด  // วันที่จ่ายล่าสุด + จำวนวันที่หารลงตัว

    let id = req.body.idboxs;
    let sql = "SELECT curdate FROM boxs ";
    sql += "WHERE id = ?";
    conn.query(sql, [id], (err, resp) => {
      if (err) {
        console.log("[mysql err]", err);
      }
      // let CurdateUpdate = resp[0].curdate ;
      // console.log("date = " + resp[0].curdate);
      gCurdateUpdate = moment(resp[0].curdate, "YYYY-MM-DD").add(
        gUnitdate,
        "days"
      );
      // console.log("new date = " + gCurdateUpdate);
      gCurdateUpdate = moment(gCurdateUpdate).format("YYYY-MM-DD");
      updateCurDate();
    });
  }

  function updateCurDate() {
    // อัฟเดทวันจ่ายล่าสุด
    // console.log("gCurdateUpdate = " + gCurdateUpdate);
    let id = req.body.idboxs;
    let curdate = moment(gCurdateUpdate).format("YYYY-MM-DD");
    let sql = "UPDATE boxs SET curdate = ? ";
    sql += "WHERE id = ?";
    conn.query(sql, [curdate, id], (err, resp) => {
      if (err) {
        console.log("[mysql err]", err);
      }
      getUser();
    });
  }

  // ค้นหา User
  function getUser() {
    // console.log("getUser");
    let username = req.body.username;
    let sql = "SELECT * FROM staff WHERE username = ? ";
    conn.query(sql, [username], (err, resp) => {
      if (err) {
        console.log("[mysql err]", err);
      }
      // console.log(resp[0].id);
      g_idUser = resp[0].id;
      savepayrecord();
    });
  }

  // 6/7/2566 update payrecord
  function savepayrecord() {
    // check table payrecord
    let nowdate = moment().format("YYYY-MM-DD"); // Updata วันนี้จ่าย
    let idboxs = req.body.idboxs;

    let sql = "SELECT * FROM payrecord WHERE idboxs = ? AND datepay = ? ";
    conn.query(sql, [idboxs, nowdate], (err, resp) => {
      if (err) {
        console.log("[mysql err]", err);
      }
      // console.log(resp.length);
      if (resp.length > 0) {
        fnGetOlePricePay(); // มีจ่ายอยู่แล้ว
      } else {
        fnInsertPayrecord(); // จ่ายใหม่ๆ
      }
    });
  }

  function fnGetOlePricePay() {
    // ค้นหาเงินจ่ายเก่า
    // console.log("fnGet");
    let nowdate = moment().format("YYYY-MM-DD");
    let idboxs = req.body.idboxs;

    let sql = "SELECT * FROM payrecord ";
    sql += "WHERE idboxs = ? AND datepay = ? ";
    conn.query(sql, [idboxs, nowdate], (err, resp) => {
      if (err) {
        console.log("[mysql err]", err);
      }
      oldpay = resp[0].pricepay;
      fnUpdatePrice();
    });
  }

  function fnUpdatePrice() {
    // อัฟเดทเงินใหม่
    // console.log("oldpay = " + oldpay);
    let selectpay = req.body.selectpay;
    let newpay = parseFloat(oldpay) + parseFloat(selectpay);
    let nowdate = moment().format("YYYY-MM-DD");
    let idboxs = req.body.idboxs;

    let sql = "UPDATE payrecord SET pricepay = ?,idstaff = ? ";
    sql += "WHERE idboxs = ? AND datepay = ?";
    conn.query(sql, [newpay, g_idUser, idboxs, nowdate], (err, resp) => {
      if (err) {
        console.log("[mysql err]", err);
      }
      updateOverPayNew();
    });
  }

  function fnInsertPayrecord() {
    let selectpay = req.body.selectpay;
    let nowdate = moment().format("YYYY-MM-DD");
    let idboxs = req.body.idboxs;
    let sql = "INSERT INTO payrecord (datepay,pricepay,idboxs,idstaff) ";
    sql += "VALUES(?,?,?,?)";
    conn.query(sql, [nowdate, selectpay, idboxs, g_idUser], (err, resp) => {
      if (err) {
        console.log("[mysql err]", err);
      }
      updateOverPayNew();
    });
  }

  function updateOverPayNew() {
    // Updata ยอดเงินเกิน
    // อัฟเดทเงินเกินที่เหลือ
    // let money = req.body.money;
    // money = parseFloat(money) + parseFloat(gOverPayOld);
    let overpaynew = gTotalPay - gMoney * gUnitdate;
    let id = req.body.idboxs;
    // gOverPay = money - money * gUnitdate;
    // console.log("gOverPaynew = " + overpaynew);
    let sql = "UPDATE boxs SET overpay = ? ";
    sql += "WHERE id = ?";
    conn.query(sql, [overpaynew, id], (err, resp) => {
      if (err) {
        console.log("[mysql err]", err);
      }
      updateboxNow();
    });
  }

  function updateboxNow() {
    // Updata Boxs วันนี้จ่ายแล้วเท่าไร
    let nowdate = moment().format("YYYY-MM-DD");
    let selectpay = req.body.selectpay;
    let newpay = parseFloat(oldpay) + parseFloat(selectpay);
    let idboxs = req.body.idboxs;

    let sql = "UPDATE boxs SET nowdate = ? , nowpaid = ? ";
    sql += "WHERE id = ?";
    conn.query(sql, [nowdate, newpay, idboxs], (err, resp) => {
      if (err) {
        console.log("[mysql err]", err);
      }
      sendData();
    });
  }

  function sendData() {
    res.end();
  }
});

// จ่าย Bill ใหญ่
router.post("/paybill", (req, res) => {
  console.log("paybill");
  console.log(req.body);
  let gMoney = 0; // เงินที่ต้องจ่ายต่อ 1 วัน
  let gUnitdate = 0; // จำนวนวันที่จ่ายลงตัว
  let gOverPay = 0; // เงินที่เกินมาจากการจ่ายที่ลงตัว
  let gOverPayOld = 0; // เงินเกินของเก่า
  let gCurdateUpdate = ""; // วันที่ต้องอัฟเดทใหม่
  let gTotalPay = 0; // ยอดเงินเกินเก่า + ยอดเงินเกินใหม่
  let oldpay = 0;
  let g_idUser = 0;

  async function main() {
    await getData();
    // res.end();
  }
  main();

  function getData() {
    // หายอดจ่ายรายวัน
    let idboxs = req.body.idboxs;
    let sql = "select price from boxs ";
    sql += "WHERE id = ?";
    conn.query(sql, [idboxs], (err, resp) => {
      if (err) {
        console.log("[mysql err]", err);
      }
      // console.log("ยอดจ่ายรายวัน = " + resp[0].price);
      gMoney = resp[0].price; // หายอดจ่ายรายวัน
      getOverPayOld();
    });
  }

  function getOverPayOld() {
    // รับเงินเกินยอดเก่า
    let id = req.body.idboxs;
    let sql = "SELECT overpay FROM boxs ";
    sql += "WHERE id = ?";
    conn.query(sql, [id], (err, resp) => {
      if (err) {
        console.log("[mysql err]", err);
      }
      gOverPayOld = resp[0].overpay; // รับเงินเกินยอดเก่า
      getUnitDate();
    });
  }

  function getUnitDate() {
    // รวมยอดเกินเก่า + ยอดจ่ายใหม่ / รายวัน  = หาวันที่ลงตัว
    // จำนวนวันที่หารลงตัว
    let selectpay = req.body.selectpay; // จำนวนเงินกรอก
    let id = req.body.idboxs;
    let totaldate = (parseFloat(selectpay) + parseFloat(gOverPayOld)) / gMoney; // เงินกรอก + เงินเกิน / รายวัน
    gTotalPay = parseFloat(selectpay) + parseFloat(gOverPayOld);
    gUnitdate = Math.floor(totaldate);
    // console.log("gUnitdate = " + gUnitdate); // จะได้วันที่ลงตัว
    clearOverPay();
  }

  function clearOverPay() {
    // ลบเงินเกิน 0
    let id = req.body.idboxs;
    let sql = "UPDATE boxs SET overpay = 0 WHERE id = ?";
    conn.query(sql, [id], (err, resp) => {
      if (err) {
        console.log("[mysql err]", err);
      }
      getOverPay();
    });
  }

  function getOverPay() {
    // หาวันที่จ่ายล่าสุด  // วันที่จ่ายล่าสุด + จำวนวันที่หารลงตัว

    let id = req.body.idboxs;
    let sql = "SELECT curdate FROM boxs ";
    sql += "WHERE id = ?";
    conn.query(sql, [id], (err, resp) => {
      if (err) {
        console.log("[mysql err]", err);
      }
      // let CurdateUpdate = resp[0].curdate ;
      // console.log("date = " + resp[0].curdate);
      gCurdateUpdate = moment(resp[0].curdate, "YYYY-MM-DD").add(
        gUnitdate,
        "days"
      );
      // console.log("new date = " + gCurdateUpdate);
      gCurdateUpdate = moment(gCurdateUpdate).format("YYYY-MM-DD");
      updateCurDate();
    });
  }

  function updateCurDate() {
    // อัฟเดทวันจ่ายล่าสุด
    // console.log("gCurdateUpdate = " + gCurdateUpdate);
    let id = req.body.idboxs;
    let curdate = moment(gCurdateUpdate).format("YYYY-MM-DD");
    let sql = "UPDATE boxs SET curdate = ? ";
    sql += "WHERE id = ?";
    conn.query(sql, [curdate, id], (err, resp) => {
      if (err) {
        console.log("[mysql err]", err);
      }
      getUser();
    });
  }

  // ค้นหา User
  function getUser() {
    // console.log("getUser");
    let username = req.body.username;
    let sql = "SELECT * FROM staff WHERE username = ? ";
    conn.query(sql, [username], (err, resp) => {
      if (err) {
        console.log("[mysql err]", err);
      }
      // console.log(resp[0].id);
      g_idUser = resp[0].id;
      savepayrecord();
    });
  }

  // 6/7/2566 update payrecord
  function savepayrecord() {
    // check table payrecord
    let nowdate = moment().format("YYYY-MM-DD"); // Updata วันนี้จ่าย
    let idboxs = req.body.idboxs;

    let sql = "SELECT * FROM payrecord WHERE idboxs = ? AND datepay = ? ";
    conn.query(sql, [idboxs, nowdate], (err, resp) => {
      if (err) {
        console.log("[mysql err]", err);
      }
      // console.log(resp.length);
      if (resp.length > 0) {
        fnGetOlePricePay(); // มีจ่ายอยู่แล้ว
      } else {
        fnInsertPayrecord(); // จ่ายใหม่ๆ
      }
    });
  }

  function fnGetOlePricePay() {
    // ค้นหาเงินจ่ายเก่า
    // console.log("fnGet");
    let nowdate = moment().format("YYYY-MM-DD");
    let idboxs = req.body.idboxs;

    let sql = "SELECT * FROM payrecord ";
    sql += "WHERE idboxs = ? AND datepay = ? ";
    conn.query(sql, [idboxs, nowdate], (err, resp) => {
      if (err) {
        console.log("[mysql err]", err);
      }
      oldpay = resp[0].pricepay;
      fnUpdatePrice();
    });
  }

  function fnUpdatePrice() {
    // อัฟเดทเงินใหม่
    // console.log("oldpay = " + oldpay);
    let selectpay = req.body.selectpay;
    let newpay = parseFloat(oldpay) + parseFloat(selectpay);
    let nowdate = moment().format("YYYY-MM-DD");
    let idboxs = req.body.idboxs;

    let sql = "UPDATE payrecord SET pricepay = ?,idstaff = ? ";
    sql += "WHERE idboxs = ? AND datepay = ?";
    conn.query(sql, [newpay, g_idUser, idboxs, nowdate], (err, resp) => {
      if (err) {
        console.log("[mysql err]", err);
      }
      updateOverPayNew();
    });
  }

  function fnInsertPayrecord() {
    let selectpay = req.body.selectpay;
    let nowdate = moment().format("YYYY-MM-DD");
    let idboxs = req.body.idboxs;
    let sql = "INSERT INTO payrecord (datepay,pricepay,idboxs,idstaff) ";
    sql += "VALUES(?,?,?,?)";
    conn.query(sql, [nowdate, selectpay, idboxs, g_idUser], (err, resp) => {
      if (err) {
        console.log("[mysql err]", err);
      }
      updateOverPayNew();
    });
  }

  function updateOverPayNew() {
    // Updata ยอดเงินเกิน
    // อัฟเดทเงินเกินที่เหลือ
    // let money = req.body.money;
    // money = parseFloat(money) + parseFloat(gOverPayOld);
    let overpaynew = gTotalPay - gMoney * gUnitdate;
    let id = req.body.idboxs;
    // gOverPay = money - money * gUnitdate;
    // console.log("gOverPaynew = " + overpaynew);
    let sql = "UPDATE boxs SET overpay = ? ";
    sql += "WHERE id = ?";
    conn.query(sql, [overpaynew, id], (err, resp) => {
      if (err) {
        console.log("[mysql err]", err);
      }
      updateboxNow();
    });
  }

  function updateboxNow() {
    // Updata Boxs วันนี้จ่ายแล้วเท่าไร
    let nowdate = moment().format("YYYY-MM-DD");
    let selectpay = req.body.selectpay;
    let newpay = parseFloat(oldpay) + parseFloat(selectpay);
    let idboxs = req.body.idboxs;

    let sql = "UPDATE boxs SET nowdate = ? , nowpaid = ? ";
    sql += "WHERE id = ?";
    conn.query(sql, [nowdate, newpay, idboxs], (err, resp) => {
      if (err) {
        console.log("[mysql err]", err);
      }
      recordbill();
    });
  }

  function recordbill() {
    let valbook = req.body.valbook;
    let valnumber = req.body.valnumber;
    let valdate = req.body.valdate;
    let idboxs = req.body.idboxs;
    let valmoney = req.body.selectpay;

    let sql = "INSERT INTO bill ";
    sql += "(`book`, `bnumber`, `bdate`,`bmoney`, `bstaff`, `bidboxs`) ";
    sql += "VALUES (?,?,?,?,?,?)";
    conn.query(
      sql,
      [valbook, valnumber, valdate, valmoney, g_idUser, idboxs],
      (err, resp) => {
        if (err) {
          console.log("mysql err", err);
        }
        sendData();
      }
    );
  }

  function sendData() {
    res.end();
  }
});

// แก้วันเริ่มทั้งหมดที่ค้นหา
router.post("/editcurdate", (req, res) => {
  async function main() {
    getData();
  }
  main();

  function getData() {
    let datestart = req.body.datestart;
    let condition = req.body.cursearch;
    let valSql = [datestart];
    // name panel tel zone
    let sql = "UPDATE boxs SET curdate = ? ";
    let val = "";
    // console.log("condition = " + condition);
    switch (condition) {
      case "name":
        sql +=
          "FROM boxs INNER JOIN customer ON customer.id = boxs.idcustomer ";
        sql += "WHERE customer.name LIKE ? ";
        val = req.body.name;
        val = "%" + val + "%";
        valSql.push(val);
        break;

      case "panel":
        sql += "WHERE panel = ? ";
        val = req.body.panel;
        valSql.push(val);
        break;

      case "tel":
        sql += "WHERE tel = ? ";
        val = req.body.tel;
        valSql.push(val);
        break;

      case "zone":
        sql += "WHERE idbuild = ? AND idzone = ? ";
        let val1 = req.body.idbuild;
        let val2 = req.body.idzone;
        valSql.push(val1);
        valSql.push(val2);
        break;

      default:
        break;
    }

    // console.log(sql);
    conn.query(sql, valSql, (err, resp) => {
      if (err) {
        console.log("[mysql err]", err);
      }
      sendData();
    });
  }

  function sendData() {
    // console.log("ok edit");
    res.end();
  }
});

router.get("/liststaff", (req, res) => {
  // console.log("staff");
  let sql = "SELECT * FROM staff";
  conn.query(sql, (err, resp) => {
    if (err) {
      console.log("[mysql data]", err);
    }
    res.send(resp);
  });
});

router.post("/addstaff", (req, res) => {
  let golNamePic = "";
  async function main() {
    await getData();
  }
  main();

  function getData() {
    if (req.body.picture === "null") {
      AddData();
    } else {
      // console.log("test");

      if (!req.files || Object.keys(req.files).length === 0) {
        // return res.status(400).send("No files were uploaded.");
        AddData();
      } else {
        let newname = req.files.picture.name;
        let blobfile = req.files.picture;
        let timePic = moment().format("YY_MM_DD_HH_mm_ss");
        let namePic = timePic + newname;
        golNamePic = namePic;
        // Use the mv() method to place the file somewhere on your server
        blobfile.mv("./public/uploadstaff/" + namePic, function (err) {
          if (err) return res.status(500).send(err);
          // conn.query(sql, [idProduct, namePic, 1], (err, resIns) => {
          if (err) {
            console.log("[mysql error]", err);
          }
          AddData();
          // });
        });
      }
    }
  }

  function AddData() {
    // console.log(req.body);

    let name = req.body.name;
    let lastname = req.body.lastname;
    let username = req.body.username;
    let password = req.body.password;
    let comm = req.body.comm;
    let role = req.body.role;
    let status = req.body.status;

    let sql = "INSERT INTO staff ";
    sql += "(name,lastname,username,password,comment,role,picture,status) ";
    sql += "VALUES(?,?,?,?,?,?,?,?)";
    conn.query(
      sql,
      [name, lastname, username, password, comm, role, golNamePic, status],
      (err, resp) => {
        if (err) {
          console.log("[mysql err]", err);
        }
        sendData();
      }
    );
  }

  function sendData() {
    res.end();
  }
});

router.post("/delstaff", (req, res) => {
  let id = req.body.id;
  let sql = "DELETE FROM staff WHERE id = ?";
  conn.query(sql, [id], (err, resp) => {
    if (err) {
      console.log("[mysql err]", err);
    }
    res.end();
  });
});

router.get("/selectstaff", (req, res) => {
  let id = req.query.id;
  let sql = "SELECT * FROM staff WHERE id = ?";
  conn.query(sql, [id], (err, resp) => {
    if (err) {
      console.log("[mysql err]", err);
    }
    res.send(resp);
  });
});

router.post("/editstaff", (req, res) => {
  console.log(req.body);
  res.end();
  let sql = "UPDATE staff SET name = ?,";
  sql += "lastname = ? , username = ? ,password = ? ,comment = ? ";
  sql += "WHERE id = ? ";
  conn.query(
    sql,
    [
      req.body.name,
      req.body.lastname,
      req.body.username,
      req.body.password,
      req.body.comm,
      req.body.id,
    ],
    (err, resp) => {
      if (err) {
        console.log("[mysql err]", err);
      }
      res.end();
    }
  );
});

router.post("/addrole", (req, res) => {
  // console.log(req.body);
  let idstaff = req.body.idstaff;
  let idbuild = req.body.idbuild;
  let idzone = req.body.idzone;
  let sql = "INSERT INTO role(idstaff,idbuild,idzone) VALUE(?,?,?)";
  conn.query(sql, [idstaff, idbuild, idzone], (err, resp) => {
    if (err) {
      console.log("[mysql err]", err);
    }
    res.end();
  });
});

router.get("/listrole", (req, res) => {
  let sql = "SELECT *,role.id As idrole ";
  sql += "FROM role ";
  sql += "INNER JOIN staff ON role.idstaff = staff.id ";
  sql += "INNER JOIN build ON role.idbuild = build.id ";
  sql += "INNER JOIN zone ON role.idzone = zone.id ";
  conn.query(sql, (err, resp) => {
    // console.log(resp);
    res.send(resp);
  });
});

router.post("/delrole", (req, res) => {
  let id = req.body.id;
  let sql = "DELETE FROM role WHERE id = ?";
  conn.query(sql, [id], (err, resp) => {
    if (err) {
      console.log("[mysql err]", err);
    }
    res.end();
  });
});

router.get("/printreport", (req, res) => {
  let datenow = moment().format("DD-MM-YYYY");
  let timenow = moment().format("HH:mm:ss");

  let idboxs = req.query.idboxs;
  // console.log("print report = " + idboxs);
  let sql = "SELECT * FROM boxs ";
  sql += "LEFT JOIN customer ON boxs.idcustomer = customer.id ";
  sql += "LEFT JOIN build ON boxs.idbuild = build.id ";
  sql += "LEFT JOIN zone ON boxs.idzone = zone.id ";
  sql += "WHERE boxs.id = ?";
  conn.query(sql, [idboxs], (err, resp) => {
    if (err) {
      console.log("[mysql err]", err);
    }
    // console.log(resp[0]);
    res.send({
      data: resp,
      datenow,
      timenow,
    });
  });
});

router.post("/stafflogin", (req, res) => {
  // console.log("stafflogin");
  // console.log(req.body);

  async function main() {
    getData();
  }
  main();

  function getData() {
    let username = req.body.username;
    let password = req.body.password;
    let sql = "SELECT * FROM staff WHERE username = ? AND password = ? ";
    conn.query(sql, [username, password], (err, resp) => {
      if (err) {
        console.log("[mysql err]", err);
      }
      res.send(resp);
    });
  }
});

router.get("/daytotal", (req, res) => {
  let datenow = moment().format("YYYY-MM-DD");
  let datenowshow = moment().format("DD-MM-YYYY");
  // console.log("daytotal");
  let total = 0;

  let datarole = [];
  let totaldata = [];

  async function main() {
    await getData();
  }
  main();

  function getData() {
    datarole = [];
    let iduser = req.query.iduser;
    iduser = parseInt(iduser);
    console.log("iduser = " + iduser);
    let sql = "SELECT *,role.id As idrole ";
    sql += "FROM role ";
    sql += "INNER JOIN zone ON role.idzone = zone.id ";
    sql += "INNER JOIN build ON role.idbuild = build.id ";
    sql += "WHERE idstaff = ? ";
    // sql += "ORDER BY role.idbuild,role.idzone,role.id ";
    sql += "ORDER BY role.id ";
    console.log(sql);

    // console.log("iduser = " + iduser);
    conn.query(sql, [iduser], (err, resp) => {
      if (err) {
        console.log("[mysql err]", err);
      }
      console.log("********");
      console.log(resp[0]);
      console.log("********");
      let mergedData = [];
      for (let i = 0; i < resp.length; i++) {
        // mergedData.push(results[i]);
        // console.log("i = " + i);
        mergedData.push(resp[i]);
        if (resp.length - 1 == i) {
          datarole = mergedData;
          setTimeout(() => {
            getTotal();
          }, 1000);
        }
      }
      // next();
      // next();
      // console.log("lenght = " + resp.length);
    });
  }

  function getTotal() {
    console.log("getTotallength = " + datarole.length);
    let datenow = moment().format("YYYY-MM-DD");
    let sql = "SELECT Sum(boxs.nowpaid) As sumpaid ";
    sql += ",boxs.idzone,boxs.idbuild,build.buildname,zone.zonename ";
    sql += "FROM boxs ";
    sql += "INNER JOIN build ON boxs.idbuild = build.id ";
    sql += "INNER JOIN zone ON boxs.idzone = zone.id ";
    sql += "WHERE idbuild = ? AND idzone = ? AND nowdate = ? ";
    for (let i = 0; i < datarole.length; i++) {
      conn.query(
        sql,
        [datarole[i].idbuild, datarole[i].idzone, datenow],
        // [idbuild, idzone, datenow],
        (err, resp) => {
          if (err) {
            console.log("[mysql err]", err);
          }

          // console.log(resp[0]);
          totaldata.push(resp[0]);
          total += resp[0].sumpaid;
          if (datarole.length - 1 == i) {
            console.log("end");
            sendData();
          }

          // console.log(i);
        }
      );
    }
  }
  function sendData() {
    // console.log(totaldata[0]);
    // console.log(total);
    // console.log("totaldata lenght = " + totaldata.length);

    res.send({
      total,
      totaldata,
      datenow,
      datenowshow,
    });
  }
});

router.get("/checkdayreport", (req, res) => {
  let datenow = moment().format("YYYY-MM-DD");
  let datenowshow = moment().format("DD-MM-YYYY");
  // console.log("daytotal");

  let datarole = [];
  let totaldata = [];
  async function main() {
    getData();
  }
  main();

  function getStaff() {}

  function getData() {
    let iduser = req.query.iduser;
    let sql = "SELECT *,role.id As idrole ";
    sql += "FROM role ";
    sql += "INNER JOIN zone ON role.idzone = zone.id ";
    sql += "INNER JOIN build ON role.idbuild = build.id ";
    sql += "WHERE idstaff = ? ";
    sql += "ORDER BY role.idbuild,role.idzone,role.id ";

    // console.log("iduser = " + iduser);
    conn.query(sql, [iduser], (err, resp) => {
      if (err) {
        console.log("[mysql err]", err);
      }
      // console.log(resp);
      datarole = resp;
      // console.log("lenght = " + resp.length);
      getTotal();
    });
  }

  async function getTotal() {
    let datenow = moment().format("YYYY-MM-DD");
    let sql = "SELECT Sum(boxs.nowpaid) As sumpaid ";
    sql += ",boxs.idzone,boxs.idbuild,build.buildname,zone.zonename ";
    sql += "FROM boxs ";
    sql += "INNER JOIN build ON boxs.idbuild = build.id ";
    sql += "INNER JOIN zone ON boxs.idzone = zone.id ";
    sql += "WHERE idbuild = ? AND idzone = ? AND nowdate = ? ";
    // for (let i = 0; i < datarole.length; i++) {
    let i = 0;
    // datarole.forEach(async (item) => {
    for (const item of datarole) {
      // console.log(item.idbuild + " " + item.idzone + " " + datenow);
      await conn.query(
        sql,
        [item.idbuild, item.idzone, datenow],
        (err, resp) => {
          // console.log("i = " + i);
          // console.log(resp[0]);
          totaldata.push(resp[0]);
          i += 1;
          // console.log(i);
          if (datarole.length == i) {
            sendData();
          }
        }
      );
    }
    // console.log("done");
    // sendData();
  }
  function sendData() {
    //  console.log(totaldata);
    // console.log("totaldata lenght = " + totaldata.length);

    res.send({
      totaldata,
      datenow,
      datenowshow,
    });
  }
});

router.get("/staffdetail", (req, res) => {
  let id = req.query.id;
  let sql = "SELECT * FROM staff WHERE id = ?";
  conn.query(sql, [id], (err, resp) => {
    if (err) {
      console.log("mysql err", err);
    }
    res.send(resp);
  });
});

router.get("/printreportday", (req, res) => {
  res.end();
});

router.post("/undomoney", (req, res) => {
  let gvalday = "";
  let gundoday = 0;
  // console.log("undomoney");
  // console.log(req.body);
  res.end();
  async function main() {
    await getOldMoney();
  }
  main();

  function getOldMoney() {
    let idboxs = req.body.idboxs;
    let sql = "SELECT nowpaid FROM boxs WHERE id = ?";
    conn.query(sql, [idboxs], (err, resp) => {
      if (err) {
        console.log("[mysql err]", err);
      }
      // console.log(resp[0].nowpaid);
      fnUpdateNewMoney(resp[0].nowpaid);
    });
  }

  function fnUpdateNewMoney(val) {
    // console.log(val);
    let nowdate = moment().format("YYYY-MM-DD");
    let idboxs = req.body.idboxs;
    let money = req.body.selectpay;
    let newval = parseFloat(val) - parseFloat(money);
    let sql = "UPDATE boxs SET nowpaid = ? WHERE id = ? ";
    conn.query(sql, [newval, idboxs], (err, resp) => {
      if (err) {
        console.log("[mysql err]", err);
      }
      if (newval <= 0) {
        // UndoDay();
        // del reccord
        let sqlDelRecord =
          "DELETE FROM payrecord WHERE idboxs = ? AND datepay = ?";
        conn.query(sqlDelRecord, [idboxs, nowdate], (err, resp) => {
          if (err) {
            console.log("[mysql err]", err);
          }
          let sqlDelNowDate = "UPDATE boxs SET nowdate = '' WHERE id = ?";
          conn.query(sqlDelNowDate, [idboxs], (err, resp) => {
            if (err) {
              console.log("[mysql err]", err);
            }
            UndoDay();
          });
        });
      } else {
        // update reccord
        let sqlUpdatRecord =
          "UPDATE payrecord SET pricepay = ? WHERE idboxs = ? AND datepay = ?";
        conn.query(sqlUpdatRecord, [newval, idboxs, nowdate], (err, resp) => {
          if (err) {
            console.log("[mysql err]", err);
          }
          UndoDay();
        });
      }
    });
  }

  function UndoDay() {
    let price = 0;
    let money = req.body.selectpay;

    let idboxs = req.body.idboxs;
    let sql = "SELECT * FROM boxs WHERE id = ?";
    conn.query(sql, [idboxs], (err, resp) => {
      if (err) {
        console.log("[mysql err]", err);
      }
      price = resp[0].price;
      gundoday = Math.floor(money / price); // ค่าของ จำนวนเต็ม กี่วัน
      let overpay = money % price; // เอาจำนวนเงินเหลือ

      let sql = "UPDATE boxs SET overpay = ? WHERE id = ?";
      conn.query(sql, [overpay, idboxs], (err, resp) => {
        if (err) {
          console.log("[mysql err]", err);
        }
        fnUpadateDay();
      });
    });
  }

  function fnUpadateDay() {
    // console.log("updata 0");
    let idboxs = req.body.idboxs;

    let sql = "SELECT * FROM boxs WHERE id = ?";

    let sqlUpdate = "UPDATE boxs SET curdate = ? WHERE id = ?";

    conn.query(sql, [idboxs], (err, resp) => {
      if (err) {
        console.log("[mysql err]", err);
      }
      let valday = moment(resp[0].curdate);
      valday = valday.subtract(gundoday, "days");
      valday = valday.format("YYYY-MM-DD");
      conn.query(sqlUpdate, [valday, idboxs], (err, resp) => {
        if (err) {
          console.log("[mysql err]", err);
        }
        sendData();
      });
    });
  }

  function sendData() {
    res.end();
  }
});

// หา ID STAFF
router.get("/getidStaff", (req, res) => {
  let username = req.query.username;
  let sql = "SELECT * FROM staff WHERE username = ?";
  conn.query(sql, [username], (err, resp) => {
    // console.log(resp);
    res.send(resp);
  });
});

// record report
router.get("/recordreport", (req, res) => {
  console.log("reperort");
  let totaldata = [];
  let nowdate = moment().format("YYYY-MM-DD");

  function main() {
    getData();
  }
  main();

  function getData() {
    let nowdate = moment().format("YYYY-MM-DD");
    let sqlParam = [];
    let startdate = req.query.startdate;
    let enddate = req.query.enddate;
    let idstaff = req.query.idstaff;
    // console.log("idstaff = " + idstaff);
    sqlParam = [startdate, enddate];
    let sql = "SELECT Sum(pricepay) As pricepay,";
    sql += "datepay,zone.zonename,build.buildname ";
    sql += "FROM payrecord ";
    sql += "INNER JOIN boxs ON payrecord.idboxs = boxs.id ";
    sql += "INNER JOIN zone ON boxs.idzone = zone.id ";
    sql += "INNER JOIN build ON boxs.idbuild = build.id ";
    sql += "WHERE datepay BETWEEN ? AND ? ";
    if (idstaff != 0) {
      sql += "AND idstaff = ? ";
      sqlParam.push(idstaff);
    }
    sql += "GROUP BY zone.id ";
    conn.query(sql, sqlParam, (err, resp) => {
      if (err) {
        console.log("[mysql err]", err);
      }
      // console.log(resp);
      totaldata = resp;
      sendData();
    });
  }

  function sendData() {
    // console.log(totaldata);
    res.send({
      totaldata,
      nowdate,
    });
  }
});

router.post("/resetdata", (req, res) => {
  async function main() {
    getData();
  }
  main();

  function getData() {
    console.log(req.body);

    let idbuild = req.body.idbuild;
    let idzone = req.body.idzone;
    let date = req.body.date;

    if (idbuild == "9999" && idzone == "9999") {
      let sql = "UPDATE boxs SET curdate = ? ,nowdate = ? ";
      sql += "WHERE 1 ";

      conn.query(sql, [date, date], (err, resp) => {
        if (err) {
          console.log("[mysql err]", err);
        }
        selectidboxs();
      });
    } else {
      let sql = "UPDATE boxs SET curdate = ? ,nowdate = ? ";
      sql += "WHERE idbuild = ? AND idzone = ? ";

      conn.query(sql, [date, date, idbuild, idzone], (err, resp) => {
        if (err) {
          console.log("[mysql err]", err);
        }
        selectidboxs();
      });
    }
  }

  function selectidboxs() {
    let idbuild = req.body.idbuild;
    let idzone = req.body.idzone;
    let sql = "SELECT id FROM boxs ";
    sql += "WHERE idbuild = ? AND idzone = ? ";
    conn.query(sql, [idbuild, idzone], (err, resp) => {
      if (err) {
        console.log("[mysql err]", err);
      }

      // let idboxs = resp[0].id;
      delpayreccord(resp);
    });
  }

  function delpayreccord(boxs) {
    let datenow = moment().format("YYYY-MM-DD");
    let date = req.body.date;
    let sql =
      "DELETE FROM payrecord WHERE idboxs = ? AND (datepay BETWEEN ? AND ?)";
    for (let i = 0; i < boxs.length; i++) {
      conn.query(sql, [boxs[i].id, date, datenow], (err, resp) => {
        if (err) {
          console.log("[mysql err]", err);
        }
        if (boxs.length - 1 == i) {
          sendData();
        }
      });
    }
  }

  function sendData() {
    res.end();
  }
});

router.get("/reprint", (req, res) => {
  console.log("idboxs = " + req.query.idboxs);
  let id = req.query.idboxs;
  let sql = "SELECT * FROM boxs WHERE id = ? ";
  conn.query(sql, [id], (err, resp) => {
    if (err) {
      console.log("[mysql err]", err);
    }
    res.send(resp);
  });
});

router.post("/editorderpanel", (req, res) => {
  console.log(req.body);
  let id = req.body.idboxs;
  let idorder = req.body.idorder;
  let sql = "UPDATE boxs SET idorder = ? WHERE id = ? ";
  conn.query(sql, [idorder, id], (err, resp) => {
    if (err) {
      console.log("[mysql err]", err);
    }
    res.end();
  });
});

router.get("/editstatuspanelshow", (req, res) => {
  let id = req.query.id;
  let sql = "UPDATE boxs SET status = 1 WHERE id = ?";
  conn.query(sql, [id], (err, resp) => {
    if (err) {
      console.log("[mysql err]", err);
    }
    console.log("show");
    res.end();
  });
});

router.get("/editstatuspaneldis", (req, res) => {
  let id = req.query.id;
  let sql = "UPDATE boxs SET status = 0 WHERE id = ?";
  console.log(sql);
  conn.query(sql, [id], (err, resp) => {
    if (err) {
      console.log("[mysql err]", err);
    }
    console.log("dis");
    res.end();
  });
});

//#####################  Park ###################//
router.get("/ptestpark", (req, res) => {
  console.log("test park");
  let sql = "SELECT * FROM admin";
  conp.query(sql, (err, resp) => {
    if (err) {
      console.log("myql err", err);
    }
    res.send(resp);
  });
});

// login admin
router.post("/ploginadmin", (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let sql = "SELECT * FROM admin WHERE username = ? AND password = ? ";
  conp.query(sql, [username, password], (err, resp) => {
    if (err) {
      console.log("mysql err", err);
    }
    res.send(resp);
  });
});

router.get("/pliststaff", (req, res) => {
  let sql = "SELECT * FROM staff WHERE status = 1";
  conp.query(sql, (err, resp) => {
    if (err) {
      console.log(err);
    }
    // console.log(resp[0]);
    res.send(resp);
  });
});

router.post("/paddstaff", (req, res) => {
  let golNamePic = "";
  // console.log(req.body);
  // let newname = req.files.picture.name;
  // console.log(req.files);
  // console.log(newname);
  function main() {
    getData();
  }
  main();

  function getData() {
    if (req.body.picture === "null") {
      AddData();
    } else {
      // console.log("test");

      if (!req.files || Object.keys(req.files).length === 0) {
        // return res.status(400).send("No files were uploaded.");
        AddData();
      } else {
        let newname = req.files.picture.name;
        let blobfile = req.files.picture;
        let timePic = moment().format("YY_MM_DD_HH_mm_ss");
        let namePic = timePic + newname;
        golNamePic = namePic;
        // Use the mv() method to place the file somewhere on your server
        blobfile.mv("./public/puploadstaff/" + namePic, function (err) {
          if (err) return res.status(500).send(err);
          // conn.query(sql, [idProduct, namePic, 1], (err, resIns) => {
          if (err) {
            console.log("[mysql error]", err);
          }
          AddData();
          // });
        });
      }
    }
  }

  function AddData() {
    let name = req.body.name;
    let lastname = req.body.lastname;
    let username = req.body.username;
    let password = req.body.password;
    let comm = req.body.comm;
    let sql = "INSERT INTO staff ";
    sql += "(name,lastname,username,password,picture,comm)";
    sql += "VALUES(?,?,?,?,?,?)";
    conp.query(
      sql,
      [name, lastname, username, password, golNamePic, comm],
      (err, resp) => {
        if (err) {
          console.log(err);
        }
        res.end();
      }
    );
  }
});

// ลบ Staff
router.delete("/pdelstaff", (req, res) => {
  let id = req.query.id;
  console.log("del= " + id);
  let sql = "UPDATE staff SET status = 0 WHERE id = ?";
  conp.query(sql, [id], (err, resp) => {
    if (err) {
      console.log("mysql err", err);
    }
    res.end();
  });
});
// End ลบ Staff

// หา Id Staff
router.get("/pfindstaffid", (req, res) => {
  let user = req.query.user;
  console.log("user = " + user);
  let sql = "SELECT * FROM staff WHERE username = ?";
  conp.query(sql, [user], (err, resp) => {
    if (err) {
      console.log("[mysql err]", err);
    }
    // console.log(resp[0]);
    res.send(resp);
  });
});

router.post("/paddstaffcheck", (req, res) => {
  function main() {
    AddData();
  }
  main();

  function AddData() {
    let name = req.body.name;
    let lastname = req.body.lastname;
    let username = req.body.username;
    let password = req.body.password;
    let comm = req.body.comm;

    let sql = "INSERT INTO staffcheck ";
    sql += "(name,lastname,username,password,comm)";
    sql += "VALUES(?,?,?,?,?)";
    conp.query(sql, [name, lastname, username, password, comm], (err, resp) => {
      if (err) {
        console.log(err);
      }
      res.end();
    });
  }
});

router.get("/pliststaffcheck", (req, res) => {
  let sql = "SELECT * FROM staffcheck WHERE status = 1";
  conp.query(sql, (err, resp) => {
    if (err) {
      console.log(err);
    }
    // console.log(resp);
    res.send(resp);
  });
});

router.get("/pdatastaffcheck", (req, res) => {
  let id = req.query.id;
  let dataTicker = [];
  let gdataStaff = [];

  async function main() {
    await getData();
  }
  main();

  async function getData() {
    let sql = "SELECT * FROM staffcheck WHERE status = 1 ";
    await conp.query(sql, [id], (err, resp) => {
      if (err) {
        console.log(err);
      }
      // console.log(resp);
      gdataStaff = resp;
      fnGetTicker(resp);
    });
  }

  async function fnGetTicker(datastaff) {
    // let // หา Index ของอ็อบเจกต์ที่คุณต้องการแก้ไขหรือเพิ่มคีย์และค่า
    let indexToModify = 0;
    let datecheck = req.query.datecheck;
    console.log("dataStaff.length =" + datastaff.length);
    let sql = "SELECT count(id) As countid FROM ticker WHERE idftaffcheck = ?";
    sql += " AND ticker.datepay = ? ";
    for (let index = 0; index < datastaff.length; index++) {
      await conp.query(sql, [datastaff[index].id, datecheck], (err, resp) => {
        if (err) {
          console.log(err);
        }
        if (resp.length > 0) {
          // หา Index ของอ็อบเจกต์ที่คุณต้องการแก้ไขหรือเพิ่มคีย์และค่า
          indexToModify = datastaff.findIndex(
            (item) => item.id === datastaff[index].id
          );
          // ตรวจสอบว่าอ็อบเจกต์อยู่ในอาร์เรย์หรือไม่
          if (indexToModify !== -1) {
            // เพิ่มคีย์และค่าในอ็อบเจกต์ที่อยู่ในอาร์เรย์
            datastaff[indexToModify].count = resp[0].countid;
          } else {
            console.log("ไม่พบอ็อบเจกต์ในอาร์เรย์");
          }

          dataTicker.push(resp[0].countid);
        } else {
          counttypecar.push(0); // เดิม
        }

        setTimeout(() => {
          if (index == datastaff.length - 1) {
            sendData();
          }
        }, 100);
      });
    }
  }

  function sendData() {
    console.log("end");
    // console.log(gdataStaff);
    // console.log(dataTicker);
    res.send({
      gdataStaff,
      dataTicker,
    });
  }
});

// ลบ Staff check
router.delete("/pdelstaffcheck", (req, res) => {
  let id = req.query.id;
  console.log("del= " + id);
  let sql = "UPDATE staffcheck SET status = 0 WHERE id = ?";
  conp.query(sql, [id], (err, resp) => {
    if (err) {
      console.log("mysql err", err);
    }
    res.end();
  });
});
// End ลบ Staff

// List car type
router.get("/plistcar", (req, res) => {
  let sql = "SELECT * FROM cartype WHERE status = 1";
  conp.query(sql, (err, resp) => {
    if (err) {
      console.log("mysql err", err);
    }
    res.send(resp);
  });
});
// End List car type
// Add cartype
router.post("/paddcartype", (req, res) => {
  let cartype = req.body.cartype;
  let price = req.body.price;
  let sql = "INSERT INTO cartype (cartype,price) VALUES(?,?)";
  conp.query(sql, [cartype, price], (err, resp) => {
    if (err) {
      console.log("mysql err", err);
    }
    res.send(resp);
  });
});

router.delete("/pdelcartype", (req, res) => {
  let id = req.query.id;
  console.log("id = " + id);
  let sql = "UPDATE cartype SET status = 0 WHERE id = ?";
  conp.query(sql, [id], (err, resp) => {
    if (err) {
      console.log("mysql err", err);
    }
    res.end();
  });
});

// build
router.get("/plistbuild", (req, res) => {
  let sql = "SELECT * FROM build WHERE status = 1 ";
  sql += "ORDER by buildorder ASC";
  conp.query(sql, (err, resp) => {
    if (err) {
      console.log("mysql err", err);
    }
    // console.log(resp[0]);
    res.send(resp);
  });
});

router.post("/paddbuild", (req, res) => {
  let build = req.body.build;
  let sql = "INSERT INTO build (namebuild) VALUES(?)";
  conp.query(sql, [build], (err, resp) => {
    if (err) {
      console.log("mysql err", err);
    }
    res.end();
  });
});

router.delete("/pdelbuild", (req, res) => {
  let id = req.query.id;
  console.log("id = " + id);
  let sql = "UPDATE build SET status = 0 WHERE id = ?";
  conp.query(sql, [id], (err, resp) => {
    if (err) {
      console.log("mysql err", err);
    }
    res.end();
  });
});

// add role
router.post("/paddrole", (req, res) => {
  console.log(req.body);
  let idstaff = req.body.idstaff;
  let idbuild = req.body.idbuild;
  let sql = "INSERT INTO role(idstaff,idbuild) VALUE(?,?)";
  conp.query(sql, [idstaff, idbuild], (err, resp) => {
    if (err) {
      console.log("[mysql err]", err);
    }
    res.end();
  });
});

// list role
router.get("/plistrole", (req, res) => {
  console.log("plist role");
  let sql = "SELECT *,role.id As idrole ";
  sql += "FROM role ";
  sql += "INNER JOIN staff ON role.idstaff = staff.id ";
  sql += "INNER JOIN build ON role.idbuild = build.id ";
  conp.query(sql, (err, resp) => {
    if (err) {
      console.log("[mysql err]", err);
    }
    console.log(resp);
    res.send(resp);
  });
});

router.get("/plistbuildfromrole", (req, res) => {
  console.log("list build from role");
  let idstaff = req.query.idstaff;
  // console.log("idstaff = " + idstaff);
  let sql = "SELECT * FROM role ";
  sql += "INNER JOIN build ON role.idbuild = build.id ";
  sql += "WHERE idstaff = ? ";
  sql += "ORDER BY buildorder ASC";
  conp.query(sql, [idstaff], (err, resp) => {
    if (err) {
      console.log("[mysql err]", err);
    }
    console.log(resp);
    res.send(resp);
  });
});

// del role
router.post("/pdelrole", (req, res) => {
  let id = req.body.id;
  let sql = "DELETE FROM role WHERE id = ?";
  conp.query(sql, [id], (err, resp) => {
    if (err) {
      console.log("[mysql err]", err);
    }
    res.end();
  });
});

router.get("/uporderbuild", (req, res) => {
  let gid = req.query.id;
  let gOrder = 0;
  function main() {
    getMax();
  }
  main();

  function getMax() {
    let sql = "SELECT count(id) As numid FROM build WHERE status = 1";
    conp.query(sql, (err, resp) => {
      if (err) {
        console.log("mysql err", err);
      }
      gmax = resp[0].numid;
      getData();
    });
  }

  function getData() {
    let sql = "SELECT * FROM build WHERE id = ?";
    conp.query(sql, [gid], (err, resp) => {
      if (err) {
        console.log("mysql err", err);
      }
      gOrder = resp[0].buildorder - 1;
      oldOrder = resp[0].buildorder;
      if (oldOrder == 1) {
        res.end();
      } else {
        getUpdate();
      }
    });
  }

  function getUpdate() {
    // console.log("gOrder = " + gOrder);
    // console.log("update1");
    let sql = "UPDATE build SET buildorder = ? WHERE buildorder = ?";
    // console.log("oldOrder=" + oldOrder);
    // console.log("gOrder=" + gOrder);
    conp.query(sql, [oldOrder, gOrder], (err, resp) => {
      if (err) {
        console.log("mysql err", err);
      }
      getUpdate2();
    });
  }

  function getUpdate2() {
    console.log("gOrder = " + gOrder);
    let sql = "UPDATE build SET buildorder = ? WHERE id = ?";
    conp.query(sql, [gOrder, gid], (err, resp) => {
      if (err) {
        console.log("mysql err", err);
      }
      res.end();
    });
  }
});
// End build

router.get("/pselectbuild", (req, res) => {
  let id = req.query.id;
  let sql = "SELECT * FROM build WHERE id = ?";
  conp.query(sql, [id], (err, resp) => {
    if (err) {
      console.log("mysql err", err);
    }
    // console.log(resp);
    res.send(resp);
  });
});

router.get("/pselectcar", (req, res) => {
  let id = req.query.id;
  let sql = "SELECT * FROM cartype WHERE id = ?";
  conp.query(sql, [id], (err, resp) => {
    if (err) {
      console.log("mysql err", err);
    }
    res.send(resp);
  });
});

router.post("/addticker", (req, res) => {
  let golNamePic = "";
  let gNowDate = moment().format("YYYY-MM-DD");
  let gNowTime = moment().format("HH:mm:ss");
  let orderno =
    moment().format("HH") +
    moment().format("mm") +
    moment().format("ss") +
    moment().format("DD") +
    moment().format("MM") +
    moment().format("YY") +
    req.body.idcar +
    req.body.idbuild;

  console.log("order no = " + orderno);

  function main() {
    getData();
  }
  main();

  function getData() {
    if (req.files === "null") {
      AddData();
    } else {
      // console.log("test");

      if (!req.files || Object.keys(req.files).length === 0) {
        // return res.status(400).send("No files were uploaded.");
        AddData();
      } else {
        let newname = req.files.picture.name;
        let blobfile = req.files.picture;
        let timePic = moment().format("YY_MM_DD_HH_mm_ss");
        let namePic = timePic + newname;
        golNamePic = namePic;
        // Use the mv() method to place the file somewhere on your server
        blobfile.mv("./public/uploadplat/" + namePic, function (err) {
          if (err) return res.status(500).send(err);
          // conn.query(sql, [idProduct, namePic, 1], (err, resIns) => {
          if (err) {
            console.log("[mysql error]", err);
          }
          AddData();
          // });
        });
      }
    }
  }

  function AddData() {
    console.log("AddData");
    let plate = req.body.plate;
    let price = req.body.inputprice;
    let idcar = req.body.idcar;
    let idbuild = req.body.idbuild;
    let idstaff = req.body.idstaff;
    let sql =
      "INSERT INTO ticker (datepay,timepay,plate,picture,price,idcar,idbuild,idstaff,orderno)";
    sql += " VALUES (?,?,?,?,?,?,?,?,?)";
    conp.query(
      sql,
      [
        gNowDate,
        gNowTime,
        plate,
        golNamePic,
        price,
        idcar,
        idbuild,
        idstaff,
        orderno,
      ],
      (err, resp) => {
        if (err) {
          console.log("mysql err", err);
        }
        sendData();
      }
    );
  }

  function sendData() {
    res.end();
  }
});

router.get("/plistticker", (req, res) => {
  let totalPrice = 0;
  function main() {
    getData();
  }
  main();

  function getData() {
    let datenow = moment().format("YYYY-MM-DD");
    console.log(datenow);
    let sql = "SELECT *, ticker As price,";
    sql += "staff.`name` AS namestaff,staff.lastname AS lastnamenamestaff ";
    sql += "FROM ticker ";
    sql += "INNER JOIN cartype ON ticker.idcar = cartype.id ";
    sql += "LEFT JOIN staff ON ticker.idstaff = staff.id ";
    sql += "INNER JOIN build ON ticker.idbuild = build.id ";
    sql += "WHERE datepay = ? ";
    sql += "ORDER BY ticker.datepay ASC,ticker.timepay ASC";

    conp.query(sql, [datenow], (err, resp) => {
      if (err) {
        console.log("mysql err", err);
      }
      console.log(resp[0]);
      // res.send(resp)
      mapData(resp);
    });
  }

  function mapData(data) {
    totalPrice = 0;
    let mData = data.map((item) => {
      totalPrice += parseFloat(item.price);
      return {
        id: item.id,
        datepay: moment(item.datepay).format("DD-MM-YYYY"),
        timepay: item.timepay,
        price: item.price,
        namestaff: item.namestaff + " " + item.lastnamestaff,
        namebuild: item.namebuild,
        cartype: item.cartype,
        plate: item.plate,
      };
    });
    sendData(mData);
  }

  function sendData(data) {
    // console.log(data[0]);
    res.send({ data, totalPrice });
  }
});

router.get("/reportsearch", (req, res) => {
  console.log("reportsearch");
  let totalprice = 0;
  let paramSql = [];
  function main() {
    getData();
  }
  main();

  function getData() {
    let datepay = req.query.datepay;
    let enddate = req.query.enddate;
    let starttime = req.query.starttime;
    let endtime = req.query.endtime;
    let plate = req.query.plate;
    let idcar = req.query.idcar;
    let build = req.query.build;
    let idstaff = req.query.idstaff;

    console.log("datepay = " + datepay);
    console.log("enddate = " + enddate);
    console.log("plate = " + plate);
    console.log("idcar = " + idcar);
    console.log("build = " + build);
    console.log("idstaff = " + idstaff);
    console.log("starttime = " + starttime);
    console.log("endtime = " + endtime);

    if (datepay == "") {
      datepay = moment().format("YYYY-MM-DD");
    }

    let sql = "SELECT *,ticker.id As id,ticker.price As price,";
    sql += "staff.`name` AS namestaff,staff.lastname AS lastnamestaff,";
    sql += "ticker.picture AS picture ";
    sql += "FROM ticker ";
    sql += "INNER JOIN cartype ON ticker.idcar = cartype.id ";
    sql += "INNER JOIN build ON ticker.idbuild = build.id ";
    sql += "LEFT JOIN staff ON ticker.idstaff = staff.id ";
    sql += "WHERE 1";
    if (datepay != "" && enddate != "") {
      // sql += " AND (datepay BETWEEN ? AND ?) ";

      let d_startdata = moment(datepay);
      let d_enddate = moment(enddate);
      let diffday = d_startdata.diff(d_enddate, "days"); // 1
      console.log("diffday = " + diffday);

      let add_startdata = d_startdata.add(1, "days");
      console.log("add_startdata = " + add_startdata.format("YYYY-MM-DD"));
      // ลดลง 1 วัน enddate โดย moment
      let add_enddate = d_enddate.subtract(1, "days");

      // if (diffday < 0) {
      //   sql += " AND ((datepay = ? AND timepay > ?) OR (datepay = ? AND timepay < ?)) ";
      //   paramSql.push(datepay);
      //   paramSql.push(starttime);
      //   paramSql.push(enddate);
      //   paramSql.push(endtime);

      //   // บวกเพิ่ม 1 วัน datepay โดย moment
      //   let add_startdata = d_startdata.add(1, 'days');
      //   // ลดลง 1 วัน enddate โดย moment
      //   let add_enddate = d_enddate.subtract(1, 'days');
      //   console.log("add_startdata = " + add_startdata.format("YYYY-MM-DD"));
      //   console.log("add_enddate = " + add_enddate.format("YYYY-MM-DD"));
      //   sql += " OR (datepay BETWEEN ? AND ?) ";
      //   paramSql.push(add_startdata.format("YYYY-MM-DD"));
      //   paramSql.push(add_enddate.format("YYYY-MM-DD"));

      // } else {

      //   // sql += " AND ((datepay = ? AND timepay > ?) AND (datepay = ? AND timepay < ?)) ";
      //   sql += " AND ((datepay = ? AND timepay > ? AND timepay < ?)) ";
      //   paramSql.push(datepay);
      //   paramSql.push(starttime);
      //   // paramSql.push(enddate);
      //   paramSql.push(endtime);

      // }
      console.log("ok");
      // New***
      if (diffday < 0) {
        console.log("ok22");

        paramSql.push(datepay);
        paramSql.push(starttime);
        paramSql.push(enddate);
        paramSql.push(endtime);
        paramSql.push(add_startdata.format("YYYY-MM-DD"));
        paramSql.push(add_enddate.format("YYYY-MM-DD"));
        console.log(paramSql);
        console.log("***************");
        sql +=
          " AND (((datepay = ? AND timepay > ?) OR (datepay = ? AND timepay < ?)) ";
        sql += " OR (datepay BETWEEN ? AND ?)) ";
      } else {
        console.log("ok200002");

        paramSql.push(datepay);
        paramSql.push(starttime);
        // paramSql.push(enddate); // old
        paramSql.push(endtime); // new
        console.log(paramSql);
        console.log("***************");
        // console.log(paramSql);
        sql += " AND ((datepay = ? AND timepay > ? AND timepay < ?)) ";
      }
      // New***
    }

    if (plate != "") {
      sql += " AND plate LIKE ? ";
      plate = "%" + plate + "%";
      paramSql.push(plate);
    }
    if (idcar != "9999") {
      sql += " AND idcar = ? ";
      paramSql.push(idcar);
    }
    if (build != "9999") {
      sql += " AND idbuild = ? ";
      paramSql.push(build);
    }
    if (idstaff != "9999") {
      sql += " AND idstaff = ? ";
      paramSql.push(idstaff);
    }

    sql += " ORDER BY datepay DESC,timepay DESC";

    // console.log(sql);

    conp.query(sql, paramSql, (err, resp) => {
      if (err) {
        console.log("mysql err", err);
      }
      // console.log(resp[0]);
      mapData(resp);
    });
  }

  function mapData(data) {
    let mData = data.map((item) => {
      totalprice += parseFloat(item.price);
      return {
        id: item.id,
        qrcode: item.id.toString(),
        datepay: moment(item.datepay).format("DD-MM-YYYY"),
        timepay: item.timepay,
        price: item.price,
        namebuild: item.namebuild,
        cartype: item.cartype,
        plate: item.plate,
        picture: item.picture,
        namestaff: item.namestaff + " " + item.lastnamestaff,
        print: item.print,
        orderno: item.orderno,
      };
    });
    sendData(mData);
  }

  function sendData(data) {
    console.log("totalprice = " + totalprice);
    // console.log(data[0]);
    res.send({
      data,
      totalprice,
    });
  }
});

router.get("/pselectticker", (req, res) => {
  // let totalprice = 0;
  function main() {
    getData();
  }
  main();

  function getData() {
    let id = req.query.id;
    let sql = "SELECT *,ticker.price As price FROM ticker ";
    sql += "LEFT JOIN cartype ON ticker.idcar = cartype.id ";
    sql += "LEFT JOIN build ON ticker.idbuild = build.id ";
    sql += "WHERE ticker.id = ?";
    conp.query(sql, [id], (err, resp) => {
      if (err) {
        console.log("mysql err", err);
      }
      // console.log(resp[0]);
      fnMapData(resp);
    });
  }

  function fnMapData(data) {
    let mData = data.map((item) => {
      return {
        ...item,
        datepayx: moment(item.datepay).format("DD-MM-YYYY"),
      };
    });
    // map data ทั้งหมด

    // // totalprice = 0;
    // let mData = data.map((item) => {
    //   // totalprice += parseFloat(item.price);
    //   return {
    //     id: item.id,
    //     datepay: moment(item.datepay).format("DD-MM-YYYY"),
    //     timepay: item.timepay,
    //     price: item.price,
    //     namebuild: item.namebuild,
    //     cartype: item.cartype,
    //     plate: item.plate,
    //     picture: item.picture,
    //     fine: item.fine,
    //   };
    // });
    sendData(mData);
  }

  function sendData(data) {
    console.log("====================================");
    console.log(data);
    // console.log('====================================');
    res.send({
      data,
      // totalprice,
    });
  }
});

router.put("/pupdateticker", (req, res) => {
  let id = req.body.id;
  let price = req.body.price;
  let plate = req.body.plate;
  let build = req.body.build;

  let sql = "UPDATE ticker SET price = ?,plate = ?,idbuild = ? WHERE id = ? ";
  conp.query(sql, [price, plate, build, id], (err, resp) => {
    if (err) {
      console.log("mysql err", err);
    }
    res.end();
  });
});

// สร้าง Dashboard
router.get("/pdashboard", (req, res) => {
  // console.log('pdashboard');
  let datestart = req.query.datestart;
  let dateend = req.query.dateend;
  let timestart = req.query.timestart;
  let timeend = req.query.timeend;
  let paramSql = [];
  let diffday = 0;
  // console.log("datestart = " + datestart);
  // console.log("dateend = " + dateend);
  // console.log("timestart = " + timestart);
  // console.log("timeend = " + timeend);

  let d_startdata = moment(datestart);
  let d_enddate = moment(dateend);
  diffday = d_startdata.diff(d_enddate, "days"); // 1
  // console.log("diffday = " + diffday);

  let add_startdata = d_startdata.add(1, "days");
  // ลดลง 1 วัน enddate โดย moment
  let add_enddate = d_enddate.subtract(1, "days");

  if (diffday < 0) {
    paramSql.push(datestart);
    paramSql.push(timestart);
    paramSql.push(dateend);
    paramSql.push(timeend);
    paramSql.push(add_startdata.format("YYYY-MM-DD"));
    paramSql.push(add_enddate.format("YYYY-MM-DD"));
  } else {
    paramSql.push(datestart);
    paramSql.push(timestart);
    paramSql.push(timeend);
  }

  if (datestart == "") {
    datestart = moment().format("YYYY-MM-DD");
  }
  if (dateend == "") {
    dateend = moment().format("YYYY-MM-DD");
  }

  function main() {
    getData();
  }
  main();

  // รวมราคา
  function getData() {
    // let sql = "SELECT SUM(price) As price FROM ticker ";

    let sql = "SELECT SUM(price) As price FROM ticker ";
    if (diffday < 0) {
      // sql += "WHERE ((datepay = ? AND timepay > ?) OR (datepay = ? AND timepay < ?)) ";
      sql +=
        "WHERE ((datepay = ? AND timepay > ?) OR (datepay = ? AND timepay < ?)) ";
      sql += " OR (datepay BETWEEN ? AND ?) ";
    } else {
      sql += "WHERE ((datepay = ? AND timepay > ? AND timepay < ?)) ";
    }
    // sql += "WHERE datepay BETWEEN ? AND ? ";

    conp.query(sql, paramSql, (err, resp) => {
      if (err) {
        console.log("mysql err", err);
      }
      // console.log("ราคา..");
      // console.log(resp[0].price);
      // console.log("ราคา");
      if (resp[0].price == null) {
        fuSumTotalCar(0);
      } else {
        fuSumTotalCar(resp[0].price);
      }
    });
  }

  // รวมจำนวนรถ
  function fuSumTotalCar(price) {
    let sql = "SELECT COUNT(id) As car FROM ticker ";
    // sql += "WHERE datepay BETWEEN ? AND ?";
    if (diffday < 0) {
      sql +=
        "WHERE ((datepay = ? AND timepay > ?) OR (datepay = ? AND timepay < ?)) ";
      sql += " OR (datepay BETWEEN ? AND ?) ";
    } else {
      sql += "WHERE ((datepay = ? AND timepay > ? AND timepay < ?)) ";
    }

    conp.query(sql, paramSql, (err, resp) => {
      if (err) {
        console.log("mysql err", err);
      }
      // console.log("******");
      // console.log(resp[0].car);
      // console.log("******");

      fnFindTypeCar(price, resp[0].car);
    });
  }

  // header ชนิดรถ
  function fnFindTypeCar(price, countticker) {
    let sql = "SELECT * FROM cartype WHERE status = 1";
    conp.query(sql, (err, resp) => {
      if (err) {
        console.log("mysql err", err);
      }
      fnFindTypeCarFromTicker(price, countticker, resp);
    });
  }

  // ต้องนับ Ticker ก่อน
  // function countTicker(price, car, datacar) {
  //   let sql = "SELECT COUNT(id) As countticker FROM ticker ";
  //   sql += "WHERE datepay BETWEEN ? AND ?";
  //   conp.query(sql, [datestart, dateend], (err, resp) => {
  //     if (err) {
  //       console.log("mysql err", err);
  //     }
  //     console.log(resp[0].countticker);
  //     fnFindTypeCarFromTicker(price, car, datacar, resp[0].countticker);
  //   });
  // }

  async function fnFindTypeCarFromTicker(price, countticker, datacar) {
    // console.log("countticker = " + countticker);
    // console.log(datacar);
    let namecar = [];
    // let paramSql = [];
    let sql = "SELECT * FROM ticker ";
    sql += "LEFT JOIN cartype ON ticker.idcar = cartype.id ";
    sql += "WHERE idcar = ? ";
    // sql += "datepay BETWEEN ? AND ?";

    if (diffday < 0) {
      sql +=
        " AND (((datepay = ? AND timepay > ?) OR (datepay = ? AND timepay < ?)) ";
      sql += " OR (datepay BETWEEN ? AND ?)) ";
      // paramSql.push(datestart);
      // paramSql.push(timestart);
      // paramSql.push(dateend);
      // paramSql.push(timeend);

      // บวกเพิ่ม 1 วัน datepay โดย moment

      // console.log("add_startdata = " + add_startdata.format("YYYY-MM-DD"));
      // console.log("add_enddate = " + add_enddate.format("YYYY-MM-DD"));
      // paramSql.push(add_startdata.format("YYYY-MM-DD"));
      // paramSql.push(add_enddate.format("YYYY-MM-DD"));
      await loopOneTwo();
    } else {
      // sql += " AND ((datepay = ? AND timepay > ?) AND (datepay = ? AND timepay < ?)) ";
      sql += " AND ((datepay = ? AND timepay > ? AND timepay < ?)) ";
      // paramSql.push(datestart);
      // paramSql.push(timestart);
      // paramSql.push(timeend);
      await loopOne();
    }

    async function loopOne() {
      // console.log("loopOne");
      // console.log(paramSql);

      for (let i = 0; i < datacar.length; i++) {
        namecar.push([]);
        for (let index = 0; index < countticker; index++) {
          await conp.query(
            sql,
            // [datacar[i].id, datestart, dateend], // เดิม
            [datacar[i].id, paramSql[0], paramSql[1], paramSql[2]], // เดิม
            (err, resp) => {
              if (err) {
                console.log("mysql err", err);
              }
              if (resp.length != 0) {
                // console.log(resp[0]);
                // console.log("i = " + i);
                namecar[i].push(resp[0]);
              } else {
                // console.log("i = " + i);
                namecar[i].push({
                  cartype: "-",
                });
              }
              if (i == datacar.length - 1 && index == countticker - 1) {
                // console.log("end");
                // console.log(namecar);
                fnDetailCar(price, countticker, datacar, namecar);
              }
            }
          );
        }
      }
    }

    async function loopOneTwo() {
      // console.log("loopOneTwoxxxllll");
      for (let i = 0; i < datacar.length; i++) {
        // console.log(i);
        namecar.push([]);
        for (let index = 0; index < countticker; index++) {
          await conp.query(
            sql,
            // [datacar[i].id, datestart, dateend], // เดิม
            [
              datacar[i].id,
              paramSql[0],
              paramSql[1],
              paramSql[2],
              paramSql[3],
              paramSql[4],
              paramSql[5],
            ], // เดิม
            (err, resp) => {
              if (err) {
                console.log("mysql err", err);
              }
              if (resp.length != 0) {
                // console.log(resp[0]);
                // console.log("i = " + i);
                namecar[i].push(resp[0]);
              } else {
                namecar[i].push({
                  cartype: "-",
                });
                // console.log("idcar =" + datacar[i].id);
              }
              if (i == datacar.length - 1 && index == countticker - 1) {
                // console.log("end");
                // console.log(namecar);
                fnDetailCar(price, countticker, datacar, namecar);
              }
            }
          );
        }
      }
    }
  }

  function fnDetailCar(price, countticker, datacar, namecar) {
    async function outLoop(i, counttypecar) {
      // console.log("price = " + price);
      // console.log("countticker = " + countticker);
      // console.log("datacar = " + datacar.length);
      // console.log("namecar = " + namecar.length);
      // console.log("counttypecar = " + counttypecar.length);
      // console.log("i is function = " + i);
      if (i == datacar.length - 1) {
        await sendData(price, countticker, datacar, namecar, counttypecar);
      } else {
        return true;
      }
    }

    if (diffday < 0) {
      // console.log("loopTwoxxx");
      // console.log(diffday);
      loopOneTwoxxx();
    } else {
      // console.log("loopOnexxx");
      // console.log(diffday);
      loopOnexxx();
    }

    async function loopOnexxx() {
      // วันเท่ากัน
      let counttypecar = [];
      let indexToModify = 0;
      // console.log(datacar);
      let sql = "SELECT count(id) As counttypecar FROM ticker ";
      sql += "WHERE idcar = ? ";
      // sql += "datepay BETWEEN ? AND ? ";
      sql += " AND ((datepay = ? AND timepay > ? AND timepay < ?)) ";

      // paramSql.push(datestart);
      // paramSql.push(timestart);
      // paramSql.push(timeend);
      // console.log(paramSql);

      let totalNomalPrice = 0;

      for (let i = 0; i < datacar.length; i++) {
        // console.log("i = " + i);
        await conp.query(
          sql,
          [datacar[i].id, paramSql[0], paramSql[1], paramSql[2]], // เดิม

          (err, resp) => {
            if (err) {
              console.log("mysql err", err);
            }
            if (resp.length != 0) {
              // หา Index ของอ็อบเจกต์ที่คุณต้องการแก้ไขหรือเพิ่มคีย์และค่า
              indexToModify = datacar.findIndex(
                (item) => item.id === datacar[i].id
              );

              // ตรวจสอบว่าอ็อบเจกต์อยู่ในอาร์เรย์หรือไม่
              if (indexToModify !== -1) {
                // เพิ่มคีย์และค่าในอ็อบเจกต์ที่อยู่ในอาร์เรย์
                datacar[indexToModify].count = resp[0].counttypecar;

                valcarprice =
                  resp[0].counttypecar * datacar[indexToModify].price;

                if (valcarprice == 0) {
                  // ต้องแก้เรื่องราคารวม
                  // datacar[indexToModify].carprice = commaNumber(
                  //   // price - totalNomalPrice
                  //   price * 0
                  // );
                  //  datacar[indexToModify].carprice = 0;
                  //  console.log("valcarprice = " + valcarprice);

                  datacar[indexToModify].carprice = "-";
                  // console.log("idcar =" + datacar[i].id);
                } else {
                  datacar[indexToModify].carprice = commaNumber(valcarprice);
                  totalNomalPrice += valcarprice;
                }
              } else {
                // console.log("ไม่พบอ็อบเจกต์ในอาร์เรย์");
              }

              counttypecar.push(resp[0].counttypecar); // เดิม
            }
            // console.log("i2 = " + i);
            outLoop(i, counttypecar);
          }
        );
      }
    }

    async function loopOneTwoxxx() {
      // console.log("loopOneTwoxxx");
      let sqlZero = "";
      // console.log(paramSql);
      let counttypecar = [];
      let indexToModify = 0;
      // console.log("datacar**********");
      // console.log(datacar);
      // console.log("datacar***********");

      let sql = "SELECT count(id) As counttypecar FROM ticker ";
      sql += "WHERE idcar = ? ";
      // sql += "datepay BETWEEN ? AND ?";
      //  sql += " AND ((datepay = ? AND timepay > ? AND timepay < ?)) ";
      sql +=
        " AND (((datepay = ? AND timepay > ?) OR (datepay = ? AND timepay < ?)) ";
      sql += " OR (datepay BETWEEN ? AND ?)) ";

      let totalNomalPrice = 0;
      // console.log(sql);
      // console.log(paramSql);

      for (let i = 0; i < datacar.length; i++) {
        // console.log("i = " + i);
        await conp.query(
          sql,
          // [datacar[i].id, datestart, dateend],
          [
            datacar[i].id,
            paramSql[0],
            paramSql[1],
            paramSql[2],
            paramSql[3],
            paramSql[4],
            paramSql[5],
          ],

          (err, resp) => {
            if (err) {
              console.log("mysql err", err);
            }
            // console.log("car = " +datacar[i].id);
            // console.log("loop ="+  resp[0].counttypecar);
            // console.log("***************");
            if (resp.length != 0) {
              // หา Index ของอ็อบเจกต์ที่คุณต้องการแก้ไขหรือเพิ่มคีย์และค่า
              indexToModify = datacar.findIndex(
                (item) => item.id === datacar[i].id
              );

              // ตรวจสอบว่าอ็อบเจกต์อยู่ในอาร์เรย์หรือไม่
              if (indexToModify !== -1) {
                // เพิ่มคีย์และค่าในอ็อบเจกต์ที่อยู่ในอาร์เรย์
                datacar[indexToModify].count = resp[0].counttypecar;

                valcarprice =
                  resp[0].counttypecar * datacar[indexToModify].price;

                if (valcarprice == 0) {
                  // datacar[indexToModify].carprice = commaNumber(
                  //   price - totalNomalPrice
                  // );
                  // datacar[indexToModify].carprice = "-";
                  // console.log("idcar =" + datacar[i].id);
                  // 2023-12-11
                  sqlZero = "SELECT sum(price) As price FROM ticker ";
                  sqlZero += "WHERE idcar = ? ";
                  sqlZero +=
                    " AND (((datepay = ? AND timepay > ?) OR (datepay = ? AND timepay < ?)) ";
                  sqlZero += " OR (datepay BETWEEN ? AND ?)) ";
                  fnsqlZero();
                  async function fnsqlZero() {
                    await conp.query(
                      sqlZero,
                      [
                        datacar[i].id,
                        paramSql[0],
                        paramSql[1],
                        paramSql[2],
                        paramSql[3],
                        paramSql[4],
                        paramSql[5],
                      ],
                      (err, resp) => {
                        if (err) {
                          console.log("mysql err", err);
                        }
                        // console.log("price = " + resp[0].price);
                        datacar[indexToModify].carprice = commaNumber(
                          resp[0].price
                        );
                        // console.log(datacar[indexToModify].carprice);
                      }
                    );
                  }

                  // 2023-12-11
                } else {
                  datacar[indexToModify].carprice = commaNumber(valcarprice);
                  totalNomalPrice += valcarprice;
                }
              } else {
                // console.log("ไม่พบอ็อบเจกต์ในอาร์เรย์");
              }

              counttypecar.push(resp[0].counttypecar); // เดิม
            } else {
              counttypecar.push(0); // เดิม
            }

            // console.log("i2 = " + i);
            setTimeout(() => {
              outLoop(i, counttypecar);
            }, 2000);
          }
        );
      }
    }
  }

  function sendData(price, countticker, datacar, namecar, counttypecar) {
    // console.log("price = " + price);
    // console.log("counttypecar = " + counttypecar.length);
    // console.log(counttypecar);
    // console.log("new*****");
    // console.log(datacar);
    // console.log("******namecar*****");
    // console.log(namecar[0]);
    // console.log();

    // console.log("***********");
    res.send({
      price,
      countticker,
      namecar, // ไม่ได้ใช้งาน
      counttypecar,
      datacar,
    });
  }
});
// End สร้าง Dashboard

router.get("/pqrcode/:id", (req, res) => {
  let id = req.params.id;
  let sql = "SELECT * FROM ticker WHERE id = ?";
  conp.query(sql, [id], (err, resp) => {
    if (err) {
      console.log("mysql err", err);
    }
    // console.log(resp[0]);
    res.send(resp[0]);
  });
});

router.post("/puploadpicture", (req, res) => {
  // console.log("puploadpicture.....");
  // console.log(req.body);
  // console.log(req.files);
  let golNamePic = "";
  // res.end();
  function main() {
    getData();
  }
  main();

  function getData() {
    if (!req.files || Object.keys(req.files).length === 0) {
      // return res.status(400).send("No files were uploaded.");
      addData();
    } else {
      let newname = req.files.image.name;
      let blobfile = req.files.image;
      let timePic = moment().format("YY_MM_DD_HH_mm_ss");
      let namePic = timePic + newname;
      golNamePic = namePic;
      // Use the mv() method to place the file somewhere on your server
      blobfile.mv("./public/uploadplat/" + namePic, function (err) {
        if (err) return res.status(500).send(err);
        // conn.query(sql, [idProduct, namePic, 1], (err, resIns) => {
        if (err) {
          console.log("[mysql error]", err);
        }
        addData();
        // });
      });
    }
  }

  function addData() {
    let idcar = req.body.idcar;
    let idbuild = req.body.idbuild;
    let idstaff = req.body.idstaff;
    let plate = req.body.plate;
    let pictur = golNamePic;
    let price = req.body.price; // no
    let fine = req.body.fine; // ค่าปรับ
    let datepay = moment().format("YYYY-MM-DD");
    let timepay = moment().format("HH:mm:ss");
    let sql = "INSERT INTO ticker ";
    sql += "(plate,picture,price,idcar,idbuild,idstaff,datepay,timepay,fine)";
    sql += "VALUES(?,?,?,?,?,?,?,?,?)";
    conp.query(
      sql,
      [plate, pictur, price, idcar, idbuild, idstaff, datepay, timepay, fine],
      (err, resp) => {
        if (err) {
          console.log("[mysql err]", err);
        }
        selectPrint(pictur);
      }
    );
  }

  function selectPrint(pictur) {
    let sql = "SELECT * FROM ticker WHERE picture = ?";
    conp.query(sql, [pictur], (err, resp) => {
      if (err) {
        console.log("[mysql err]", err);
      }
      // console.log("id = " + resp[0].id);
      sendData(resp[0].id);
    });
  }

  function sendData(id) {
    res.send({ id });
  }
});

router.get("/pprintreport", (req, res) => {
  function main() {
    getData();
  }
  main();

  function getData() {
    let id = req.query.id;
    let sql = "SELECT *,ticker.price As price FROM ticker  ";
    sql += "INNER JOIN cartype ON ticker.idcar = cartype.id ";
    sql += "INNER JOIN build ON ticker.idbuild = build.id ";
    sql += "WHERE ticker.id = ? ";
    conp.query(sql, [id], (err, resp) => {
      if (err) {
        console.log("[mysql err]", err);
      }
      // console.log(resp[0]);
      mapData(resp);
    });
  }

  function mapData(data) {
    let mData = data.map((item) => {
      return {
        id: item.id,
        datepay: moment(item.datepay).format("DD-MM-YYYY"),
        timepay: item.timepay,
        price: item.price,
        namebuild: item.namebuild,
        cartype: item.cartype,
        plate: item.plate,
        picture: item.picture,
        fine: item.fine,
      };
    });
    sendData(mData);
  }

  function sendData(data) {
    // console.log(data);
    res.send(data);
  }
});

router.get("/ploadlist", (req, res) => {
  // console.log("ploadlist..................");
  function main() {
    sumPrice();
  }
  main();

  function delThai(text) {
    // ใช้ regular expression สำหรับตรวจสอบอักษรไทย
    const thaiPattern = /[ก-๙]/g;
    // ใช้ replace() เพื่อลบอักษรไทย
    const cleanedText = text.replace(thaiPattern, "");
    return cleanedText;
  }

  function getProvince(text) {
    // ใช้ regular expression สำหรับค้นหาตัวเลข
    const numberPattern = /\d+/g;

    // ใช้ .match() เพื่อค้นหาตัวเลขในข้อความ
    const matchedNumbers = text.match(numberPattern);

    // ถ้ามีตัวเลขที่เจอ
    if (matchedNumbers) {
      // ดึงข้อความหลังจากตัวเลข
      const textAfterNumber = text.substring(
        text.indexOf(matchedNumbers[0]) + matchedNumbers[0].length
      );
      return textAfterNumber.trim();
    }

    return null; // ไม่เจอตัวเลข
  }

  function testNumInString(inputString) {
    //ตรวจสอบตัวเลขในสตริง
    var regex = /\d/;
    return regex.test(inputString);
  }

  function delNum(text) {
    const numberPattern = /[0-9]/g;
    let valtext = text + "9";
    // ใช้ regular expression สำหรับตรวจสอบตัวเลข
    const cleanedText = valtext.replace(numberPattern, "");
    return cleanedText;

    // ใช้ replace() เพื่อลบตัวเลข
  }

  function getBeforeNum(text) {
    // ใช้ regular expression สำหรับค้นหาตัวเลข
    const numberPattern = /\d+/g;

    // ใช้ .match() เพื่อค้นหาตัวเลขในข้อความ
    const matchedNumbers = text.match(numberPattern);

    // ถ้ามีตัวเลขที่เจอ
    if (matchedNumbers) {
      // ดึงข้อความก่อนตัวเลข
      const textBeforeNumber = text.substring(
        0,
        text.indexOf(matchedNumbers[0])
      );
      return textBeforeNumber.trim();
    }

    return null; // ไม่เจอตัวเลข
  }

  function getPlatThai(text) {
    // ใช้ regular expression สำหรับตรวจสอบพยัญชนะภาษาไทย
    const thaiConsonantPattern = /[^ก-๙]/g;
    let valtxt = text + "9";

    // ใช้ replace() เพื่อลบทุกอักษรที่ไม่ใช่พยัญชนะภาษาไทย
    const thaiConsonantsOnly = valtxt.replace(thaiConsonantPattern, "");

    return thaiConsonantsOnly;
  }

  function sumPrice() {
    let iduser = req.query.iduser; // idsaff
    let datenow = moment().format("YYYY-MM-DD");
    let sql = "SELECT SUM(price) As price FROM ticker WHERE idstaff = ? ";
    sql += "AND datepay = ?";
    conp.query(sql, [iduser, datenow], (err, resp) => {
      if (err) {
        console.log("[mysql err]", err);
      }
      // console.log("*****");
      // console.log(resp[0].price);
      // console.log("*****");

      if (
        resp[0].price == null ||
        resp[0].price == undefined ||
        resp[0].price == 0
      ) {
        res.send({
          sumprice: 0,
        });
      } else {
        getData(commaNumber(resp[0].price));
      }
    });
  }

  function getData(sumprice) {
    let iduser = req.query.iduser; // idsaff
    let datenow = moment().format("YYYY-MM-DD");
    // console.log("datenow = " + datenow);

    let sql = "SELECT * FROM ticker WHERE idstaff = ? ";
    sql += "AND datepay = ?  ";
    sql += "ORDER by datepay DESC,timepay DESC ";
    conp.query(sql, [iduser, datenow], (err, resp) => {
      if (err) {
        console.log("[mysql err]", err);
      }
      // console.log(resp);
      mapData(sumprice, resp);
    });
    // sendData();
  }

  function mapData(sumprice, data) {
    let mData = data.map((item) => {
      return {
        id: item.id,
        txtplate: getPlatThai(getBeforeNum(item.plate)),
        plate: delThai(item.plate),
        plateprovince: delNum(getProvince(item.plate)),
        picture: item.picture,
        price: item.price,
        datepay: moment(item.datepay).format("DD-MM-YYYY"),
        timepay: item.timepay,
      };
    });
    sendData(sumprice, mData);
  }

  function sendData(sumprice, data) {
    // console.log(data[0]);
    res.send({
      sumprice,
      data,
    });
  }
});

router.post("/pcheckstaff", (req, res) => {
  let data = req.body;
  // console.log(data);
  // res.end();

  function main() {
    getData();
  }
  main();

  function getData() {
    // console.log("update");
    let idstaff = req.body.idstaff;
    let idticker = req.body.idticker;
    let sql = "UPDATE ticker SET idftaffcheck = ? WHERE id = ?";
    conp.query(sql, [idstaff, idticker], (err, resp) => {
      if (err) {
        console.log("[mysql err]", err);
      }
      sendData();
    });
  }

  function sendData() {
    res.end();
  }
});

router.get("/pcheckid", (req, res) => {
  function main() {
    getData();
  }
  main();

  function getData() {
    let id = req.query.id;
    // console.log("id = " + id);
    // ข้อความต้นฉบับ
    // ข้อความต้นฉบับ
    var originalText = id;

    // หาตำแหน่งของเครื่องหมาย '/'
    var lastIndex = originalText.lastIndexOf("/");

    // ถ้าพบเครื่องหมาย '/' ในข้อความ
    if (lastIndex !== -1) {
      // ใช้ substring หรือ slice เพื่อเอาแค่ส่วนที่ต้องการ
      var result = originalText.substring(lastIndex + 1);
      // หรือใช้ slice ได้เช่นกัน
      // var result = originalText.slice(lastIndex + 1);

      // console.log(result);
      result = parseInt(result);
      id = result;
    } else {
      // console.log("ไม่พบเครื่องหมาย '/' ในข้อความ");
      id = id;
    }

    // console.log("id = " + id);
    let sql = "SELECT * ,ticker.id As id ,staff.name As namestaff, ";
    sql += "staff.lastname As lastnamestaff, ";
    sql += "staffcheck.name As namestaffcheck, ";
    sql += "staffcheck.lastname As lastnamestaffcheck, ";
    sql += "staffcheck.password As staffpassword, ";
    sql += "ticker.price As price, ";
    sql += "ticker.picture As picture ";
    sql += " FROM ticker ";
    sql += "Left JOIN build ON ticker.idbuild = build.id ";
    sql += "Left JOIN cartype ON ticker.idcar = cartype.id ";
    sql += "Left JOIN staff ON ticker.idstaff = staff.id ";
    sql += "Left JOIN staffcheck ON ticker.idftaffcheck = staffcheck.id ";
    sql += "WHERE ticker.id = ?";

    conp.query(sql, [id], (err, resp) => {
      if (err) {
        console.log("[mysql err]", err);
      }
      // console.log(resp);
      mapData(resp);
    });
  }

  function mapData(data) {
    let mData = data.map((item) => {
      if (item.lastnamestaffcheck == null) {
        item.lastnamestaffcheck = "";
      }
      if (item.namestaffcheck == null) {
        item.namestaffcheck = "";
      }

      return {
        id: item.id,
        datepay: moment(item.datepay).format("DD-MM-YYYY"),
        timepay: item.timepay,
        price: item.price,
        namebuild: item.namebuild,
        cartype: item.cartype,
        plate: item.plate,
        picture: item.picture,
        idstaff: item.idstaff,
        namestaff: item.namestaff + " " + item.lastnamestaff,
        idftaffcheck: item.idftaffcheck,
        namestaffcheck: item.namestaffcheck + " " + item.lastnamestaffcheck,
        staffpassword: item.staffpassword,
      };
    });
    sendData(mData);
  }

  function sendData(data) {
    // console.log(data);
    res.send(data);
  }
});

// qrcode ios scanner
// router.get("/qrcodedetail/:id", (req, res) => {
//   function main() {
//     getData();
//   }
//   main();

//   function getData() {
//     let id = req.params.id;
//     console.log("id = " + id);
//     let sql = "SELECT * ,ticker.id As id ,staff.name As namestaff, ";
//     sql += "staff.lastname As lastnamestaff, ";
//     sql += "staffcheck.name As namestaffcheck, ";
//     sql += "staffcheck.lastname As lastnamestaffcheck, ";
//     sql += "ticker.price As price, ";
//     sql += "ticker.picture As picture ";
//     sql += " FROM ticker ";
//     sql += "Left JOIN build ON ticker.idbuild = build.id ";
//     sql += "Left JOIN cartype ON ticker.idcar = cartype.id ";
//     sql += "Left JOIN staff ON ticker.idstaff = staff.id ";
//     sql += "Left JOIN staffcheck ON ticker.idftaffcheck = staffcheck.id ";
//     sql += "WHERE ticker.id = ?";

//     conp.query(sql, [id], (err, resp) => {
//       if (err) {
//         console.log("[mysql err]", err);
//       }
//       // console.log(resp);
//       mapData(resp);
//     });
//   }

//   function mapData(data) {
//     let mData = data.map((item) => {
//       if (item.lastnamestaffcheck == null) {
//         item.lastnamestaffcheck = "";
//       }
//       if (item.namestaffcheck == null) {
//         item.namestaffcheck = "";
//       }

//       return {
//         id: item.id,
//         datepay: moment(item.datepay).format("DD-MM-YYYY"),
//         timepay: item.timepay,
//         price: item.price,
//         namebuild: item.namebuild,
//         cartype: item.cartype,
//         plate: item.plate,
//         picture: item.picture,
//         idstaff: item.idstaff,
//         namestaff: item.namestaff + " " + item.lastnamestaff,
//         idftaffcheck: item.idftaffcheck,
//         namestaffcheck: item.namestaffcheck + " " + item.lastnamestaffcheck,
//       };
//     });
//     sendData(mData);
//   }

//   function sendData(data) {
//     console.log(data);
//     res.render("iosqrcode", {
//       data: data,
//     });
//   }
// });
// End qrcode ios scanner

router.get("/qrcodedetail/:pass/:id", (req, res) => {
  // router.get("/qrcodedetail", (req, res) => {
  console.log("plogincheck");
  // console.log("id AND pass");

  let id = req.params.id;
  let pass = req.params.pass;
  let idCheck = 0;
  // console.log("id = " + id);
  // console.log("pass = " + pass);

  let data = [
    {
      id: id,
      datepay: "",
      timepay: "",
      price: "",
      namebuild: "",
      cartype: "",
      plate: "",
      picture: "",
      namestaff: "",
      namestaffcheck: "",
      staffpassword: 0,
    },
  ];

  function main() {
    checkPass();
  }
  main();

  function checkPass() {
    data = [
      {
        id: "0000",
        datepay: "-",
        timepay: "-",
        price: "-",
        namebuild: "-",
        cartype: "-",
        plate: "-",
        picture: "-",
        namestaff: "-",
        namestaffcheck: "-",
        staffpassword: 0,
      },
    ];
    let sql = "SELECT * FROM staffcheck WHERE password = ?";
    conp.query(sql, [pass], (err, resp) => {
      if (err) {
        console.log("[mysql err]", err);
      }
      // console.log(resp);
      if (resp.length < 1) {
        idCheck = 0;
      } else {
        idCheck = resp[0].id;
      }

      if (resp.length > 0) {
        console.log("id = " + id);
        let sql = "SELECT * ,ticker.id As id ,staff.name As namestaff, ";
        sql += "staff.lastname As lastnamestaff, ";
        sql += "staffcheck.name As namestaffcheck, ";
        sql += "staffcheck.lastname As lastnamestaffcheck, ";
        // sql += "staffcheck.password As staffpassword, ";
        sql += "ticker.price As price, ";
        sql += "ticker.picture As picture ";
        sql += " FROM ticker ";
        sql += "Left JOIN build ON ticker.idbuild = build.id ";
        sql += "Left JOIN cartype ON ticker.idcar = cartype.id ";
        sql += "Left JOIN staff ON ticker.idstaff = staff.id ";
        sql += "Left JOIN staffcheck ON ticker.idftaffcheck = staffcheck.id ";
        sql += "WHERE ticker.id = ?";

        // console.log("pass ok");
        conp.query(sql, [id], (err, resp) => {
          if (err) {
            console.log("[mysql err]", err);
          }
          // console.log(resp);
          // mapData(resp);
          data = resp;
          mData(data);
        });
      } else {
        // console.log("pass no");
        sendData(data);
      }
    });
  }

  function mData(data) {
    // sendData();
    let mData = data.map((item) => {
      if (item.lastnamestaffcheck == null) {
        item.lastnamestaffcheck = "";
      }
      if (item.namestaffcheck == null) {
        item.namestaffcheck = "";
      }

      return {
        id: item.id,
        datepay: moment(item.datepay).format("DD-MM-YYYY"),
        timepay: item.timepay,
        price: item.price,
        namebuild: item.namebuild,
        cartype: item.cartype,
        plate: item.plate,
        picture: item.picture,
        idstaff: item.idstaff,
        namestaff: item.namestaff + " " + item.lastnamestaff,
        idftaffcheck: item.idftaffcheck,
        namestaffcheck: item.namestaffcheck + " " + item.lastnamestaffcheck,
        staffpassword: item.staffpassword,
      };
    });
    sendData(mData);
  }

  function sendData(mdata) {
    // console.log("**************************");
    // console.log(mData[0]);
    // console.log("**************************");

    res.render("iosqrcode", {
      login: false,
      data: mdata,
      id: id,
      idcheck: idCheck,
      staffpass: pass,
    });
  }
});

router.get("/qrcodedetail/:id", (req, res) => {
  // console.log("id");
  let id = req.params.id;
  // console.log("id = " + id);

  let data = [
    {
      id: id,
      datepay: "",
      timepay: "",
      price: "",
      namebuild: "",
      cartype: "",
      plate: "",
      picture: "",
      namestaff: "",
      namestaffcheck: "",
      staffpassword: 0,
    },
  ];

  res.render("iosqrcode", {
    login: false,
    id: id,
    data: data,
    idcheck: 0,
    staffpass: 0,
  });
});

router.get("/plogincheck/:pass", (req, res) => {
  // console.log("plogincheck");
  let pass = req.params.pass;
  // console.log("pass = " + pass);

  res.render("iosdetail", {
    login: false,
    data: [],
    idcheck: 0,
    idstaff: 0,
  });
});

// ลบ ticker
router.delete("/pdeleteticker", (req, res) => {
  let id = req.query.id;
  let sql = "DELETE FROM ticker WHERE id = ?";
  conp.query(sql, [id], (err, resp) => {
    if (err) {
      console.log("[mysql err]", err);
    }
    sendData();
  });

  function sendData() {
    res.end();
  }
});

router.get("/psendmoney", (req, res) => {
  let iduser = req.query.iduser;
  let datenow = moment().format("YYYY-MM-DD");
  let timepay = moment().format("HH:mm:ss");
  // console.log(iduser);

  function main() {
    sumMoney();
  }
  main();

  function sumMoney() {
    let sql = "SELECT SUM(price) As price FROM ticker ";
    sql += "WHERE idstaff = ? ";
    sql += "AND datepay = ? ";
    conp.query(sql, [iduser, datenow], (err, resp) => {
      if (err) {
        console.log("[mysql err]", err);
      }
      // console.log("*****");
      // console.log(resp[0].price);
      // console.log("*****");
      fnBuild(resp[0].price);
    });
  }

  function fnBuild(totalprice) {
    sql = "SELECT sum(price) AS sumprice,";
    sql += "ticker.idbuild,";
    sql += "build.namebuild ";
    sql += "FROM role ";
    sql += "LEFT JOIN ticker ON role.idbuild = ticker.idbuild ";
    sql += "LEFT JOIN build ON ticker.idbuild = build.id ";
    sql += "WHERE role.idstaff = ? ";
    sql += "AND ticker.idstaff = ? ";
    sql += "AND ticker.datepay = ? ";
    sql += "GROUP BY role.id ";
    // console.log(sql);
    conp.query(sql, [iduser, iduser, datenow], (err, resp) => {
      if (err) {
        console.log("[mysql err]", err);
      }
      // console.log(resp);
      sendData(totalprice, resp);
    });
  }

  function sendData(sumMoney, data) {
    // console.log(sumMoney);
    sumMoney = commaNumber(sumMoney);
    res.send({ sumMoney, data, timepay, datenow });
  }
});

// Dayreport
router.post("/dayreportpark", (req, res) => {
  let dataStaff = [];
  let Total = [];
  function main() {
    getDataStaff();
  }
  main();

  function getDataStaff() {
    let datepay = req.body.datepay;
    // console.log(req.body);
    let sql = "SELECT ticker.idstaff, staff.`name`,staff.lastname FROM ticker ";
    sql += "LEFT JOIN staff ON ticker.idstaff = staff.id ";
    sql += "WHERE datepay = ? ";
    sql += "GROUP BY idstaff ";
    sql += "order by ticker.timepay ASC ";
    conp.query(sql, [datepay], (err, resp) => {
      if (err) {
        console.log("[mysql err]", err);
      }
      // console.log(resp.length);
      dataStaff = resp;
      // console.log(dataStaff);
      if (resp.length == 0) {
        sendData();
      } else {
        fnBuild();
      }
    });
  }

  function fnBuild() {
    // console.log(dataStaff);
    // console.log("dataLength = " + dataStaff.length)
    let sql =
      "SELECT ticker.idbuild, build.namebuild,ticker.idcar,cartype.namereport,";
    sql += "count(ticker.id) As numcar, ";
    sql += "sum(ticker.price) As totalprice ";
    sql += "FROM ticker ";
    sql += "LEFT JOIN build ON ticker.idbuild = build.id ";
    sql += "LEFT JOIN cartype ON ticker.idcar = cartype.id ";
    sql += "WHERE datepay = ? AND idstaff = ? AND cartype.status = 1 ";
    sql += "GROUP BY idbuild,cartype.idcargroup";
    let toal = 0;
    for (let i = 0; i < dataStaff.length; i++) {
      // dataStaff[i] = [];
      conp.query(sql, [req.body.datepay, dataStaff[i].idstaff], (err, resp) => {
        if (err) {
          console.log("[mysql err]", err);
        }
        dataStaff[i].detail = resp;
        // console.log("resp.length == " + resp.length);
        if (i == dataStaff.length - 1) {
          // dataStaff[0].alltotal = allTotal;
          setTimeout(() => {
            totalAllPrice();
          }, 1000);
        }
      });
      // console.log("i = " + i);
    }

    // setTimeout(() => {
    //   sendData()
    // }, 2000);
  }

  function totalAllPrice() {
    let sql = "SELECT sum(price) As totalprice FROM ticker ";
    sql += "WHERE datepay = ? ";
    conp.query(sql, [req.body.datepay], (err, resp) => {
      if (err) {
        console.log("[mysql err]", err);
      }
      dataStaff[0].alltotal = resp[0].totalprice;
      dataStaff[0].date = moment(req.body.datepay).format("DD-MM-YYYY");
      totalAllCar();
    });
  }

  function totalAllCar() {
    let sql = "SELECT count(id) As totalcar FROM ticker ";
    sql += "WHERE datepay = ? ";
    conp.query(sql, [req.body.datepay], (err, resp) => {
      if (err) {
        console.log("[mysql err]", err);
      }
      dataStaff[0].alltotalcar = resp[0].totalcar;
      sendData();
    });
  }

  function sendData() {
    // console.log("end");
    // console.log(dataStaff[0]);
    res.send({
      data: dataStaff,
    });
  }
});
// End Dayreport
// Dayreportall
router.post("/dayreportparkall_", (req, res) => {
  // console.log("dayreportparkall");
  // console.log(req.body);

  let dataDate = [];
  let Total = [];
  let TotalCar = [];
  function main() {
    getDataDate();
  }
  main();

  function getDataDate() {
    let datepay = req.body.datepay;
    let enddatepay = req.body.enddatepay;
    // console.log(req.body);

    let sql = "SELECT datepay FROM ticker ";
    sql += "WHERE ticker.datepay BETWEEN ? AND ? ";
    sql += "GROUP BY ticker.datepay";
    conp.query(sql, [datepay, enddatepay], (err, resp) => {
      if (err) {
        console.log("[mysql err]", err);
      }
      // console.log("dataLength = " + resp.length);

      dataDate = resp;
      // console.log(dataStaff);
      if (resp.length == 0) {
        sendData();
      } else {
        mapDate();
      }
    });
  }

  function mapDate() {
    let mDataDate = dataDate.map((item) => {
      return {
        datepay: moment(item.datepay).format("YYYY-MM-DD"),
      };
    });
    dataDate = mDataDate;
    fnTypeCar(mDataDate);
  }

  // แบ่งกลุ่มประเภทรถ
  function fnTypeCar(mDataDate) {
    let sql =
      "SELECT cartype.cartype,cartype.id,ticker.idcar,cartype.idcargroup ";
    sql += "FROM ticker ";
    sql += "INNER JOIN cartype ON ticker.idcar = cartype.id ";
    sql += "WHERE datepay = ? ";
    sql += "GROUP BY idcargroup";

    let sqlBuild = "SELECT Sum(ticker.price) AS sumprice,";
    sqlBuild += "count(ticker.id) As countcar,";
    sqlBuild += "ticker.idbuild,";
    sqlBuild += "build.namebuild,";
    sqlBuild += "cartype.idcargroup ";
    sqlBuild += "FROM ticker ";
    sqlBuild += "INNER JOIN cartype ON ticker.idcar = cartype.id ";
    sqlBuild += "INNER JOIN build ON ticker.idbuild = build.id ";
    sqlBuild += "WHERE datepay = ? ";
    sqlBuild += "AND idcargroup = ? ";
    sqlBuild += "GROUP BY build.id";

    for (let i = 0; i < mDataDate.length; i++) {
      // console.log(mDataDate[i].datepay);
      conp.query(sql, [mDataDate[i].datepay], (err, resp) => {
        if (err) {
          console.log("[mysql err]", err);
        }
        dataDate[i].cargroup = resp;

        // Out loop
        let sumCar = 0;
        for (let j = 0; j < resp.length; j++) {
          conp.query(
            sqlBuild,
            [mDataDate[i].datepay, resp[j].idcargroup],
            (err, respp) => {
              if (err) {
                console.log("[mysql err]", err);
              }
              if (respp.length == 0) {
                dataDate[i].cargroup[j].detailbuild = [];
              } else {
                sumCar += respp[0].countcar;
                dataDate[i].cargroup[j].detailbuild = respp;
                // console.log("sumCar = " + sumCar);
                // if(i == resp.length - 1){
                //   TotalCar.push(sumCar);
                //   sumCar = 0;
                // }
              }

              if (i == mDataDate.length - 1 && j == resp.length - 1) {
                sendData();
              }
            }
          );
        }

        // End Out Loop
      });
    }
  }

  //// แบ่งกลุ่มอาคาร
  function fnBuild(mDataDate) {}

  function sendData() {
    // console.log("end");
    // console.log(dataDate[0]);
    // console.log(TotalCar);
    // console.log(dataDate[1]);
    // console.log(dataDate[2]);
    setTimeout(() => {
      res.send({
        datadate: dataDate,
        totalcar: TotalCar,
      });
    }, 1000);
  }
});
// End Dayreport

router.post("/dayreportparkall", (req, res) => {
  console.log("dayreportparkall");

  let dataDate = [];
  let dataday = [];
  let dataTypeCar = [];
  let bottomTotal = [];
  let totalBigAllDay = [];
  let typecarPrice = [];

  function main() {
    getTypeCar();
  }
  main();

  function getTypeCar() {
    let sql = "SELECT idcargroup,namereport FROM cartype ";
    sql += "WHERE status = 1 ";
    sql += "GROUP BY idcargroup ";
    sql += "ORDER BY idcargroup ASC ";

    conp.query(sql, (err, resp) => {
      if (err) {
        console.log("[mysql err]", err);
      }
      dataTypeCar = resp;
      fnDate();
    });
  }

  // หาวัน
  function fnDate() {
    let datepay = req.body.datepay;
    let enddatepay = req.body.enddatepay;
    let sql = "SELECT datepay FROM ticker ";
    sql += "WHERE ticker.datepay BETWEEN ? AND ? ";
    sql += "GROUP BY ticker.datepay";
    conp.query(sql, [datepay, enddatepay], (err, resp) => {
      if (err) {
        console.log("[mysql err]", err);
      }
      dataday = resp;
      mapDate();
    });
  }

  function mapDate() {
    let mDataDate = dataday.map((item) => {
      return {
        datepay: moment(item.datepay).format("YYYY-MM-DD"),
      };
    });
    dataday = mDataDate;
    fnTypeCarinDay();
  }
  //

  // นำประเภทรถไปใส่ใน วัน
  function fnTypeCarinDay() {
    let sql = "SELECT idcargroup,namereport FROM cartype ";
    sql += "WHERE status = 1 ";
    sql += "GROUP BY idcargroup ";
    sql += "ORDER BY idcargroup ASC ";

    for (let i = 0; i < dataday.length; i++) {
      conp.query(sql, (err, resp) => {
        if (err) {
          console.log("[mysql err]", err);
        }
        // console.log(resp);
        dataday[i].typecar = resp;
        if (i == dataday.length - 1) {
          setTimeout(() => {
            fnBuildinCar();
            // }, 3000);
          }, 10000);
        }
        // sendData();
      });
    }
  }

  // นำอาคารไปใส่ใน ประเภทรถ
  function fnBuildinCar() {
    let sql = "SELECT build.id AS idbuild ,build.namebuild ";
    sql += "FROM build WHERE status = 1 ";
    sql += "ORDER BY buildorder ";

    for (let i = 0; i < dataday.length; i++) {
      // console.log("xxx TEst ");
      let total = 0;
      for (let n = 0; n < dataday[i].typecar.length; n++) {
        conp.query(sql, (err, resp) => {
          if (err) {
            console.log("[mysql err]", err);
          }
          // console.log(resp);
          //     // console.log("test");
          dataday[i].typecar[n].detail = resp;

          if (i == dataday.length - 1 && n == dataday[i].typecar.length - 1) {
            // fnDetailPrice();
            setTimeout(() => {
              fnDetailPrice();
            }, 100);
          }
        });
      }
    }
  }

  function fnDetailPrice() {
    // console.log("xxxxxxxxxxxxxxxxxxxxxxxxx");
    // console.log(dataday.length);
    // console.log("xxxxxxxxxxxxxxxxxxxxxxxxx");

    let sql = "SELECT Sum(ticker.price) AS price,";
    sql += "Count(ticker.id) AS numcar ";
    sql += "FROM ticker ";
    sql += "INNER JOIN build ON ticker.idbuild = build.id ";
    sql += "INNER JOIN cartype ON ticker.idcar = cartype.id ";
    sql += "WHERE datepay = ? ";
    sql += "AND build.id = ? ";
    sql += "AND cartype.idcargroup = ?";
    let valtotalprice = 0;

    for (let i = 0; i < dataday.length; i++) {
      for (let n = 0; n < dataday[i].typecar.length; n++) {
        for (let m = 0; m < dataday[i].typecar[n].detail.length; m++) {
          conp.query(
            sql,
            [
              dataday[i].datepay,
              dataday[i].typecar[n].detail[m].idbuild,
              dataday[i].typecar[n].idcargroup,
            ],
            (err, resp) => {
              if (err) {
                console.log("[mysql err]", err);
              }
              dataday[i].typecar[n].detail[m].detailprice = resp;
              if (
                i == dataday.length - 1 &&
                n == dataday[i].typecar.length - 1 &&
                m == dataday[i].typecar[n].detail.length - 1
              ) {
                setTimeout(() => {
                  totalPrice();
                }, 200);
              }
            }
          );
        }
      }
    }
  }

  // function fnBuild() {
  //   let datepay = req.body.datepay;
  //   let enddatepay = req.body.enddatepay;

  //   let sql = "SELECT "
  //   sql += "Sum(ticker.price) AS price,"
  //   sql += "Count(ticker.id) AS numcar,"
  //   sql += "cartype.idcargroup,build.namebuild "
  //   sql += "FROM ticker "
  //   sql += "INNER JOIN build ON ticker.idbuild = build.id "
  //   sql += "INNER JOIN cartype ON ticker.idcar = cartype.id "
  //   sql += " WHERE datepay = ? "
  //   sql += "AND cartype.idcargroup = ? "
  //   sql += "GROUP BY build.id "

  //   for (let n = 0; n < dataday.length; n++) {
  //     for (let i = 0; i < dataTypeCar.length; i++) {
  //       conp.query(sql, [dataday[n].datepay, dataTypeCar[i].idcargroup], (err, resp) => {
  //         if (err) {
  //           console.log("[mysql err]", err);
  //         }
  //         // dataTypeCar[i].detail = resp;
  //       }
  //       )

  //     }
  //     // dataday[n].car = dataTypeCar;
  //     if (n == dataday.length - 1) {
  //       sendData();
  //     }
  //   }

  // }

  function totalPrice() {
    for (let i = 0; i < dataday.length; i++) {
      let sql =
        "SELECT sum(price) As totalprice,count(id) As totalcar FROM ticker ";
      sql += "WHERE datepay = ? ";
      conp.query(sql, [dataday[i].datepay], (err, resp) => {
        if (err) {
          console.log("[mysql err]", err);
        }
        dataday[i].totalprice = resp[0].totalprice;
        dataday[i].totalcar = resp[0].totalcar;

        if (i == dataday.length - 1) {
          fnTotalBigAllDay();
        }
      });
    }
  }

  function fnTotalBigAllDay() {
    let sql =
      "SELECT sum(price) As totalprice,count(id) As totalcar FROM ticker ";
    sql += "WHERE datepay BETWEEN ? AND ? ";
    conp.query(sql, [req.body.datepay, req.body.enddatepay], (err, resp) => {
      if (err) {
        console.log("[mysql err]", err);
      }
      totalBigAllDay = resp;
      totalAllDay();
    });
  }

  function totalAllDay() {
    // console.log("***************");
    // console.log(dataday[0].typecar.length);
    // console.log("***************");
    let valtotalprice = 0;
    let valtotalcar = 0;

    for (let i = 0; i < dataday[0].typecar.length; i++) {
      // ประเภทรถ
      for (let n = 0; n < dataday[0].typecar[i].detail.length; n++) {
        // อาคาร
        valtotalprice = 0;
        valtotalcar = 0;
        for (let m = 0; m < dataday.length; m++) {
          // วัน
          valtotalprice += dataday[m].typecar[i].detail[n].detailprice[0].price;
          valtotalcar += dataday[m].typecar[i].detail[n].detailprice[0].numcar;
          if (
            i == dataday[0].typecar.length - 1 &&
            n == dataday[0].typecar[i].detail.length - 1 &&
            m == dataday.length - 1
          ) {
            dashboardTypeCarPrice();
          }
        }
        // setTimeout(() => {
        bottomTotal.push(valtotalcar, valtotalprice);
        // },100);
      }
    }
  }

  function dashboardTypeCarPrice() {
    let datepay = req.body.datepay;
    let enddatepay = req.body.enddatepay;

    let sql = "SELECT Sum(ticker.price) AS DashboardPrice,";
    sql += "Count(ticker.id) As DashboardCar,";
    sql += "cartype.idcargroup,cartype.namereport ";
    sql += "FROM ticker ";
    sql += "INNER JOIN cartype ON ticker.idcar = cartype.id ";
    sql += "WHERE ticker.datepay BETWEEN ? AND ? ";
    // sql += "WHERE ticker.datepay = ? "
    sql += "GROUP BY idcargroup ";
    conp.query(sql, [datepay, enddatepay], (err, resp) => {
      if (err) {
        console.log("[mysql err]", err);
      }
      typecarPrice = resp;
      sendData();
    });
  }

  function sendData() {
    setTimeout(() => {
      res.send({
        dataTypeCar,
        dataday,
        bottomTotal,
        totalBigAllDay,
        typecarPrice,
      });
    }, 1000);
  }
});

//#####################  End Park ###################//

//#####################  Buffet ###################//
router.post("/buffet-booking", (req, res) => {
  function main() {
    getData();
  }
  main();

  function getData() {
    // console.log(req.body);
    // console.log(req.files);

    addUploadPicture();
    // sendData();
  }

  function addUploadPicture() {
    console.log("addUploadPicture");

    let golNamePic = "";

    if (!req.files || Object.keys(req.files).length === 0) {
      console.log("No files were uploaded.");
      addData();
    } else {
      let newname = req.files.paymentSlip.name;
      let blobfile = req.files.paymentSlip;
      let timePic = moment().format("YY_MM_DD_HH_mm_ss");
      let namePic = timePic;
      golNamePic = namePic + newname;
      // console.log("newname = " + golNamePic);
      // addData();

      blobfile.mv("./public/uploadbuffet/" + golNamePic, function (err) {
        if (err) return res.status(500).send(err);
        // if (err) {
        //   console.log("[mysql error]", err);
        // }
        addTicket(golNamePic);
      });
    }

    async function addTicket(golNamePic) {
      const { idround, book, Data } = req.body;

      console.log("============start========================");
      // console.log(Data.length);
      // let nameData = Array.isArray(Data) ? Data : JSON.parse(Data);
      // console.log(Data.length);

      let sql = "INSERT INTO ticket ";
      sql += "(bdate,btime,idround,idgroup,name,tel,slip,confstatus)";
      sql += " VALUES (?,?,?,?,?,?,?,?)";

      let bdate = moment().format("YYYY-MM-DD");
      let btime = moment().format("HH:mm:ss");
      let idgroup = uuid.v4();

      let nameData = [];
      try {
        nameData = Array.isArray(Data) ? Data : JSON.parse(Data);
      } catch (e) {
        nameData = [];
      }
      for (const element of nameData) {
        const { name, phone } = element;
        // console.log("name = " + name);
        // console.log("phone = " + phone);

        await new Promise((resolve) => {
          conb.query(
            sql,
            [bdate, btime, idround, idgroup, name, phone, golNamePic, 0],
            (err, resp) => {
              if (err) {
                console.log("[mysql err]", err);
              }
              resolve();
            }
          );
        });
      }

      sendData();
    }

    function sendData() {
      res.send({
        message: "File uploaded successfully",
        status: "success",
        // picture: golNamePic,
      });
    }
  }
});

router.get("/buffet-round-count", (req, res) => {
  let sql = "SELECT idbuffetround, numround FROM countround";
  conb.query(sql, (err, resp) => {
    if (err) {
      console.log("[mysql err]", err);
      return res.status(500).send({ error: "Database error" });
    }
    const rounds = resp.map((row) => ({
      idbuffetround: row.idbuffetround,
      numround: row.numround,
    }));
    // console.log(rounds);
    res.send({ rounds });
  });
});

router.get("/buffet-check", (req, res) => {
  function main() {
    updateLastTime();
  }
  main();

    function updateLastTime() {
      console.log("updateLastTime");
      
      const nowDate = moment().format("YYYY-MM-DD");
      const nowTime = moment().format("HH:mm:ss");
      const sql = "UPDATE lasttime SET lastdate = ?, lasttime = ? WHERE id = 1";
      conb.query(sql, [nowDate, nowTime], (err, resp) => {
        if (err) {
          console.log("[mysql err]", err);
        }
        // ไม่ต้องส่ง response ตรงนี้ เพราะฟังก์ชันนี้เป็น utility

        checkBooking();
      });
    }

  function checkBooking() {
    const book = req.query.book;
    const dateround = req.query.dateround;

    if (!book || !dateround) {
      return res
        .status(400)
        .send({ error: "Missing book or dateround parameter" });
    }

    console.log("Checking booking for book:", book, "on date:", dateround);

    // ดึงค่าปัจจุบันของ numround จาก countround
    let sqlSelect = "SELECT numround FROM countround WHERE idbuffetround = ?";
    conb.query(sqlSelect, [dateround], (err, result) => {
      if (err) {
        console.log("[mysql err]", err);
        return res.status(500).send({ error: "Database error" });
      }
      if (!result || result.length === 0) {
        return res.status(404).send({ error: "Not found" });
      }
      let currentNumRound = result[0].numround;
      let newNumRound = currentNumRound - parseInt(book, 10);
      if (newNumRound < 0) {
        res.send({ success: false, numround: newNumRound });
      } else {
        // อัปเดตค่าที่ได้เข้าไปใหม่
        let sqlUpdate =
          "UPDATE countround SET numround = ? WHERE idbuffetround = ?";
        conb.query(sqlUpdate, [newNumRound, dateround], (err, updateResult) => {
          if (err) {
            console.log("[mysql err]", err);
            return res.status(500).send({ error: "Database error" });
          }

          res.send({ success: true, numround: newNumRound });
        });
      }
    });
  }

  // res.end();
});

router.get("/buffet-report", (req, res) => {
  let sql = "SELECT *, ticket.id AS idtiket ";
  sql += "FROM ticket ";
  sql += "LEFT JOIN buffetround ON ticket.idround = buffetround.id ";
  sql += "ORDER BY ticket.id DESC";
  conb.query(sql, (err, resp) => {
    if (err) {
      console.log("[mysql err]", err);
      return res.status(500).send({ error: "Database error" });
    }
    // console.log(resp);
    res.send(resp);
  });
});

router.post("/buffet-confirm", (req, res) => {
  const id = req.body.id;
  let sql = "UPDATE ticket SET confstatus = 1 WHERE id = ?";
  conb.query(sql, [id], (err, resp) => {
    if (err) {
      console.log("[mysql err]", err);
      return res.status(500).send({ error: "Database error" });
    }
    res.send({ success: true });
  });
});

router.post("/buffet-reverse", (req, res) => {
  const id = req.body.id;
  let sql = "UPDATE ticket SET confstatus = 0 WHERE id = ?";
  conb.query(sql, [id], (err, resp) => {
    if (err) {
      console.log("[mysql err]", err);
      return res.status(500).send({ error: "Database error" });
    }
    res.send({ success: true });
  });
});


router.get("/buffet-sync-round", (req, res) => {
  
  console.log("buffet-sync-round called");
  

  const now = moment();
  let sqlLast = "SELECT lastdate, lasttime FROM lasttime WHERE id = 1";
  conb.query(sqlLast, (err, rows) => {
    if (err) {
      console.log("[mysql err]", err);
      return res.status(500).send({ error: "Database error" });
    }
    if (!rows || rows.length === 0) {
      return res.status(404).send({ error: "No lasttime record" });
    }
    const lastMoment = moment(`${rows[0].lastdate} ${rows[0].lasttime}`, "YYYY-MM-DD HH:mm:ss");
    const diffMinutes = now.diff(lastMoment, "minutes");
    if (diffMinutes < 1) {
      return res.send({ updated: false, message: "Not enough time passed" });
    }

    // นับจำนวน ticket group by idround
    let sqlTicket = `
      SELECT idround, COUNT(*) AS count
      FROM ticket
      GROUP BY idround
    `;
    conb.query(sqlTicket, async (err, ticketRows) => {
      if (err) {
        console.log("[mysql err]", err);
        return res.status(500).send({ error: "Database error" });
      }
      if (!ticketRows || ticketRows.length === 0) {
        return res.send({ updated: false, message: "No ticket data" });
      }

      let updateTasks = ticketRows.map(row => {
        return new Promise((resolve, reject) => {
          // อัปเดท countround.numround = 70 - ticketCount
          let newNum = 70 - row.count;
          let sqlUpdate = "UPDATE countround SET numround = ? WHERE idbuffetround = ?";
          console.log(sqlUpdate, [newNum, row.idround]);
          
          conb.query(sqlUpdate, [newNum, row.idround], (err2) => {
            if (err2) return reject(err2);
            resolve({ idround: row.idround, ticketCount: row.count, newNum });
          });
        });
      });

      try {
        let results = await Promise.all(updateTasks);
        res.send({ updated: true, detail: results ,message : "Sync completed successfully"});
      } catch (e) {
        console.log("[mysql err]", e);
        res.status(500).send({ error: "Database error" });
      }
    });
  });
});




// router.get("/buffet-sync-round", (req, res) => {
//   // 1. ตรวจสอบ lasttime ว่าเกิน 10 นาทีหรือยัง
//   const now = new Date();
//   const nowMoment = moment(now);
//   let lastDate, lastTime;

//   let sqlLast = "SELECT lastdate, lasttime FROM lasttime WHERE id = 1";
//   conb.query(sqlLast, (err, rows) => {
//     if (err) {
//       console.log("[mysql err]", err);
//       return res.status(500).send({ error: "Database error" });
//     }
//     if (!rows || rows.length === 0) {
//       return res.status(404).send({ error: "No lasttime record" });
//     }
//     lastDate = rows[0].lastdate;
//     lastTime = rows[0].lasttime;

//     // รวมวันและเวลา
//     let lastMoment = moment(`${lastDate} ${lastTime}`, "YYYY-MM-DD HH:mm:ss");
//     let diffMinutes = nowMoment.diff(lastMoment, "minutes");

//     if (diffMinutes < 10) {
//       // ยังไม่ถึง 10 นาที
//       return res.send({ updated: false, message: "Not enough time passed" });
//     }

//     // 2. นับจำนวน ticket group by idround
//     let sqlTicket = `
//       SELECT idround, COUNT(*) AS count
//       FROM ticket
//       GROUP BY idround
//     `;
//     conb.query(sqlTicket, async (err, ticketRows) => {
//       if (err) {
//         console.log("[mysql err]", err);
//         return res.status(500).send({ error: "Database error" });
//       }
//       if (!ticketRows || ticketRows.length === 0) {
//         return res.send({ updated: false, message: "No ticket data" });
//       }

//       let updateTasks = ticketRows.map(row => {
//         return new Promise((resolve, reject) => {
//           // ดึง countround.numround เดิม
//           let sqlCount = "SELECT numround FROM countround WHERE idbuffetround = ?";
//           conb.query(sqlCount, [row.idround], (err, countRows) => {
//             if (err) return reject(err);
//             if (!countRows || countRows.length === 0) return resolve();
//             let oldNum = countRows[0].numround;
//             let newNum = oldNum - row.count;
//             // อัปเดต countround.numround = oldNum - ticketCount
//             let sqlUpdate = "UPDATE countround SET numround = ? WHERE idbuffetround = ?";
//             conb.query(sqlUpdate, [newNum, row.idround], (err2) => {
//               if (err2) return reject(err2);
//               resolve({ idround: row.idround, oldNum, ticketCount: row.count, newNum });
//             });
//           });
//         });
//       });

//       try {
//         let results = await Promise.all(updateTasks);
//         res.send({ updated: true, detail: results });
//       } catch (e) {
//         console.log("[mysql err]", e);
//         res.status(500).send({ error: "Database error" });
//       }
//     });
//   });
// });










// router.get("/buffet-report-update-btn", (req, res) => {
//   const now = new Date();
//   const nowMinus12 = new Date(now.getTime() - 10 * 60 * 1000);
//   const timeLimit = nowMinus12.toTimeString().slice(0, 8); // "HH:mm:ss"
//   const dateLimit = nowMinus12.toISOString().slice(0, 10); // "YYYY-MM-DD"

//   // นับจำนวน ticket ที่ confstatus = 0 และ btime < เวลาปัจจุบัน - 12 นาที, group by idround
//   let sql = `
//     SELECT idround, COUNT(*) AS count
//     FROM ticket
//     WHERE confstatus = 0
//       AND (
//         (bdate < ?)
//         OR (bdate = ? AND btime < ?)
//       )
//     GROUP BY idround
//   `;
//   conb.query(sql, [dateLimit, dateLimit, timeLimit], (err, rows) => {
//     if (err) {
//       console.log("[mysql err]", err);
//       return res.status(500).send({ error: "Database error" });
//     }
//     if (!rows || rows.length === 0) {
//       return res.send({ updated: 0, detail: [] });
//     }

//     let updated = 0;
//     let detail = [];
//     let updateTasks = rows.map(row => {
//       return new Promise((resolve, reject) => {
//         // ดึงค่า numround เดิม
//         let selectSql = "SELECT numround FROM countround WHERE idbuffetround = ?";
//         conb.query(selectSql, [row.idround], (err, result) => {
//           if (err) return reject(err);
//           if (!result || result.length === 0) return resolve();
//           let oldNum = result[0].numround;
//           let newNum = oldNum + row.count;
//           // อัปเดตค่า numround
//           let updateSql = "UPDATE countround SET numround = ? WHERE idbuffetround = ?";
//           conb.query(updateSql, [newNum, row.idround], (err2) => {
//             if (err2) return reject(err2);
//             // อัปเดต ticket เป็น confstatus = 3
//             let updateTicketSql = `
//               UPDATE ticket
//               SET confstatus = 3
//               WHERE confstatus = 0
//                 AND idround = ?
//                 AND (
//                   (bdate < ?)
//                   OR (bdate = ? AND btime < ?)
//                 )
//             `;
//             conb.query(updateTicketSql, [row.idround, dateLimit, dateLimit, timeLimit], (err3) => {
//               if (err3) return reject(err3);
//               updated++;
//               detail.push({
//                 idround: row.idround,
//                 oldNum,
//                 add: row.count,
//                 newNum
//               });
//               resolve();
//             });
//           });
//         });
//       });
//     });

//     Promise.all(updateTasks)
//       .then(() => res.send({ updated, detail }))
//       .catch(e => {
//         console.log("[mysql err]", e);
//         res.status(500).send({ error: "Database error" });
//       });
//   });
// });

router.get("/buffet-report-round/:id", (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).send({ error: "Missing id parameter" });
  }
  console.log("Fetching buffet report for round ID:", id);
  let sql = "SELECT *, ticket.id AS idtiket FROM ticket ";
  sql += "LEFT JOIN buffetround ON ticket.idround = buffetround.id ";
  sql += "WHERE ticket.idround = ? ";
  sql += "ORDER BY ticket.id DESC";
  conb.query(sql, [id], (err, resp) => {
    if (err) {
      console.log("[mysql err]", err);
      return res.status(500).send({ error: "Database error" });
    }
    res.send(resp);
  });
});

router.get("/buffet-report-id", (req, res) => {
  let status = req.query.status;
  console.log("Fetching buffet report with status:", status);

  let sql = "SELECT *, ticket.id AS idtiket FROM ticket ";
  sql += "LEFT JOIN buffetround ON ticket.idround = buffetround.id ";
  if (status !== undefined) {
    sql += "WHERE ticket.confstatus = ? ";
  }
  sql += "ORDER BY ticket.id DESC";
  const params = status !== undefined ? [status] : [];
  conb.query(sql, params, (err, resp) => {
    if (err) {
      console.log("[mysql err]", err);
      return res.status(500).send({ error: "Database error" });
    }
    res.send(resp);
  });
});

router.get("/buffet-update-book", (req, res) => {
  console.log("Updating buffet booking...");

  const book = parseInt(req.query.book, 10);
  const dateround = req.query.dateround;

  if (isNaN(book) || !dateround) {
    return res
      .status(400)
      .send({ error: "Missing or invalid book or dateround parameter" });
  }

  let sqlSelect = "SELECT numround FROM countround WHERE idbuffetround = ?";
  conb.query(sqlSelect, [dateround], (err, result) => {
    if (err) {
      console.log("[mysql err]", err);
      return res.status(500).send({ error: "Database error" });
    }
    if (!result || result.length === 0) {
      return res.status(404).send({ error: "Not found" });
    }
    let currentNumRound = result[0].numround;
    let newNumRound = currentNumRound + book;
    let sqlUpdate =
      "UPDATE countround SET numround = ? WHERE idbuffetround = ?";
    conb.query(sqlUpdate, [newNumRound, dateround], (err, updateResult) => {
      if (err) {
        console.log("[mysql err]", err);
        return res.status(500).send({ error: "Database error" });
      }
      res.send({ success: true, numround: newNumRound });
    });
  });
});


router.post("/buffet-receive-ticket", (req, res) => {
  const id = req.body.id;
  if (!id) {
    return res.status(400).send({ error: "Missing id parameter" });
  }
  let sql = "UPDATE ticket SET confstatus = 4 WHERE id = ?";
  conb.query(sql, [id], (err, resp) => {
    if (err) {
      console.log("[mysql err]", err);
      return res.status(500).send({ error: "Database error" });
    }
    res.send({ success: true });
  });
});

//#####################  End Buffet ###################//

module.exports = router;
