var express = require('express');
var app = express();
app.use(express.static('public'));

app.get('/indexRedirect', function (req, res) {
    res.sendFile(__dirname + "/" + "index.html");
})



app.get('/index.html', function (req, res) {
    res.sendFile(__dirname + "/" + "index.html");
})

app.get('/angukar1.html', function (req, res) {
    res.sendFile(__dirname + "/" + "angukar1.html");
})

app.get('/angulartest', function (req, res) {
    response = {
      //data: "asd",
      test: req.query.myData
	  
    };
    console.log("HELLO:"+response.test);
	console.log(response);
    res.end(JSON.stringify(response));
})

app.get('/index', function (req, res) {
    // Prepare output in JSON format
    response = {
        email: req.query.em2,
        pssword: req.query.pss1
    };
    console.log(response);
    //res.end(JSON.stringify(response));
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/pnb";
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbase = db.db("pnb");
             //var query = { address: "Delhi" }; 
             dbase.collection("emp").findOne({ em2: response.email,pss1:response.pssword }, function (err, result) {
            if (err) {
				throw err;
								
			}
			if(result==null){
				console.log("err");
                 res.redirect("/indexRedirect");
			}else {
				console.log(result);
				console.log("success");
                res.redirect("/home");
                
                //res.end(JSON.stringify("welcome"));
            }
            db.close();
        });
    });

})

app.get('/home', function (req, res) {
    res.sendFile(__dirname + "/" + "home.html");
})

app.get('/home.html', function (req, res) {
    res.sendFile(__dirname + "/" + "home.html");
})

app.get('/signup.html', function (req, res) {
    res.sendFile(__dirname + "/" + "signup.html");
})

app.get('/signup', function (req, res) {
    // Prepare output in JSON format
    response = {
        name1: req.query.name1,
        em2: req.query.em2,
        pss1: req.query.pss1,
        add2: req.query.add2,
        p1: req.query.p1,
        c1: req.query.c1,
        s1: req.query.s1
    };
    console.log(response);
   // res.end(JSON.stringify(response));
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/pnb";
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbase = db.db("pnb");
        //var myobj = { name: "Ajeet Kumar", age: "28", address: "Delhi" };  
        dbase.collection("emp").insertOne(response, function (err, res) {
            if (err) {
                throw err;
            } else {
                console.log("1 record inserted");
                //res.render("/index");

            }
            res.redirect("/home");
            db.close();
        });
    });




})
app.get('/depositRedirect', function (req, res) {
    res.sendFile(__dirname + "/" + "deposit.html");
})
app.get('/deposit.html', function (req, res) {
    res.sendFile(__dirname + "/" + "deposit.html");
})

app.get('/deposit', function (req, res) {
    // Prepare output in JSON format
    response = {
        account: req.query.acc,
        acbal: req.query.acbal
    };
    console.log(response);
  
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://127.0.0.1:27017/pnb";

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var accstat, accbal;

        var dbase = db.db("pnb");


        //dbase.collection("employees").findOne({name: acc}, function(err, result){
        //dbo.collection("account").find(myquery).toArray(function(err, result)
        dbase.collection("account").findOne({ acc: response.account }, function (err, result) {
            if (err) throw err;

            console.log("result.acbal=" + result.acbal);
            balncedep = parseFloat(response.acbal);
            accstat = result.acstatus;
            acbal1 = parseFloat(result.acbal);
            accbal = acbal1 + balncedep;
            console.log("accstat=" + accstat);
            console.log("accbal=" + accbal);
            var myquery = { acc: response.acc };
            accountno = response.account;

            var MongoClient = require('mongodb').MongoClient;
            var url = "mongodb://127.0.0.1:27017/pnb";

            MongoClient.connect(url, function (err, db) {
                if (err) throw err;
                var myquery = { acc: accountno };

                var dbase = db.db("pnb");

                if (accstat === "N") {

                    var newvalues = { $set: { acbal: acbal1, acstatus: "O" } };
                    dbase.collection("account").updateOne(myquery, newvalues, function (err, res1) {
                        if (err) throw err;
                        console.log("deposit succesfuly");
                        res.redirect("/home");
                        db.close();
                    });
                }
                else if (accstat === "O") {

                    var newvalues = { $set: { acbal: accbal } };
                    dbase.collection("account").updateOne(myquery, newvalues, function (err, res1) {
                        if (err){ throw err;}
                        else{
                            console.log("deposit succesfuly");
                            res.redirect("/home");}
                        db.close();
                    });
                }
                else {
                    console.log("account close");
                    res.redirect("/depositRedirect");
                }

            });
        });
    });
    
    var MongoClient = require('mongodb').MongoClient;  
    var url = "mongodb://localhost:27017/pnb";  
    MongoClient.connect(url, function(err, db) {  
        if (err) throw err;  
        var dbase = db.db("pnb");  
      
        dbase.collection("account").find(response.acc).toArray(function(err, result) {  
            if (err){ throw err;  }
            else{
            
                console.log(result);
            } 
            db.close();  
        });  
        
    });
})
app.get('/accountcloseRedirect', function (req, res) {
    res.sendFile(__dirname + "/" + "accountclose.html");
})
app.get('/accountclose.html', function (req, res) {
    res.sendFile(__dirname + "/" + "accountclose.html");
})

app.get('/accountclose', function (req, res) {
    // Prepare output in JSON format
    response = {
        account: req.query.acc
      
    };
    console.log(response);
   // res.end(JSON.stringify(response));
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://127.0.0.1:27017/pnb";

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var accstat, accbal;

        var dbase = db.db("pnb");


        //dbase.collection("employees").findOne({name: acc}, function(err, result){
        //dbo.collection("account").find(myquery).toArray(function(err, result)
        dbase.collection("account").findOne({ acc: response.account }, function (err, result) {
            if (err) throw err;
            accstat = result.acstatus;
            accbal = 0;
            
            accountno = response.account;

            var MongoClient = require('mongodb').MongoClient;
            var url = "mongodb://127.0.0.1:27017/pnb";

            MongoClient.connect(url, function (err, db) {
                if (err) throw err;
                var myquery = { acc: accountno };

                var dbase = db.db("pnb");

                if (accstat === "N") {

                    var newvalues = { $set: { acstatus: "C" } };
                    dbase.collection("account").updateOne(myquery, newvalues, function (err, res1) {
                        if (err) throw err;
                        console.log("account close succesfuly");
					res.redirect("/home");
                        db.close();
                    });
                }
               
                else if (accstat === "O") {

                    var newvalues = { $set: { acstatus: "C", acbal: accbal } };
                    dbase.collection("account").updateOne(myquery, newvalues, function (err, res1) {
                        if (err) throw err;
                        console.log("account close succesfuly");
					res.redirect("/home");
					  db.close();
                    });
                }
                else {
					console.log("account alerady close");
					 res.redirect("/accountcloseRedirect");
                }

            });
        });
    });
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/pnb";
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbase = db.db("pnb");

        dbase.collection("account").find(response.acc).toArray(function (err, result) {
            if (err) { throw err; }
            else {

                console.log(result);
            }
            db.close();
        });

    });
})

app.get('/transfermoneyRedirect', function (req, res) {
    res.sendFile(__dirname + "/" + "transfermoney.html");
})

app.get('/transfermoney.html', function (req, res) {
    res.sendFile(__dirname + "/" + "transfermoney.html");
})

app.get('/transfermoney', function (req, res) {
    // Prepare output in JSON format
    response = {
        accnt: req.query.acc,
        account: req.query.acc1,
        acbal: req.query.acbal
    };
    console.log(response);
  //  res.end(JSON.stringify(response));
    var a;
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://127.0.0.1:27017/pnb";

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var accstat, accbal;

        var dbase = db.db("pnb");

        console.log(response.accnt);
        //dbase.collection("employees").findOne({name: acc}, function(err, result){
        //dbo.collection("account").find(myquery).toArray(function(err, result)
        dbase.collection("account").findOne({ acc: response.accnt }, function (err, result) {
            if (err) throw err;
            console.log(result);
            console.log("result.acbal=" + result.acbal);
            balncewith = parseFloat(response.acbal);
            accstat = result.acstatus;
            acbal1 = parseFloat(result.acbal);
            accbal = acbal1 - balncewith;
            console.log("accstat=" + accstat);
            console.log("accbal=" + accbal);

            accountno1 = response.accnt;

            var MongoClient = require('mongodb').MongoClient;
            var url = "mongodb://127.0.0.1:27017/pnb";

            MongoClient.connect(url, function (err, db) {
                if (err) throw err;
                var myquery1 = { acc: accountno1 };

                var dbase = db.db("pnb");

                if (accstat === "N") {
                    console.log("sorry you have not sufficent amount");
                    a = 1;
          
                }
                else if (accstat === "O") {
                    if (acbal1 > balncewith) {
                        var newvalues = { $set: { acbal: accbal } };
                        s=newvalues
                        console.log("hi"+accbal);
                        console.log(myquery1);
                        console.log(s);
                        dbase.collection("account").updateOne(myquery1, newvalues, function (err, res1) {
                            if (err) throw err;
                            console.log("withdraw is done");
                           	
                            a = 0;
                            
                        });
                    }
                    else {
                        console.log("sorry you have not sufficent amount");
                        a = 1;
                    
                    }
                }
                else {
					console.log("account close");
					  res.redirect("/transfermoneyRedirect");
					  a=1;
                }

            });
        });
    });

    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://127.0.0.1:27017/pnb";

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var accstat, accbal;

        var dbase = db.db("pnb");

        console.log(response.accnt);
        //dbase.collection("employees").findOne({name: acc}, function(err, result){
        //dbo.collection("account").find(myquery).toArray(function(err, result)
        dbase.collection("account").findOne({ acc: response.account }, function (err, result) {
            if (err) throw err;

            console.log("result.acbal=" + result.acbal);
            balncedep = parseFloat(response.acbal);
            accstat = result.acstatus;
            acbal1 = parseFloat(result.acbal);
            accbal = acbal1 + balncedep;
            console.log("accstat=" + accstat);
            console.log("accbal=" + accbal);
            var myquery = { acc: response.acc };
            accountno = response.account;

            var MongoClient = require('mongodb').MongoClient;
            var url = "mongodb://127.0.0.1:27017/pnb";

            MongoClient.connect(url, function (err, db) {
                if (err) throw err;
                var myquery = { acc: accountno };

                var dbase = db.db("pnb");

                if (accstat === "N") {
                    if (a != 1) {
                        var newvalues = { $set: { acbal: acbal1, acstatus: "O" } };
                        dbase.collection("account").updateOne(myquery, newvalues, function (err, res1) {
                            if (err) throw err;
                            console.log("deposit succesfuly");
                            res.redirect("/home");
                            db.close();
                        });
                    }
                    else {
                        console.log("sender has not sufficent money");
                        res.redirect("/transfermoneyRedirect");
                        db.close();
                    }
                }
                else if (accstat === "O") {
                    if (a != 1) {
                        var newvalues = { $set: { acbal: accbal } };
                        s = newvalues
                        console.log("hidepo" + accbal);
                        console.log(myquery);
                        console.log(s);
                        dbase.collection("account").updateOne(myquery, newvalues, function (err, res1) {
                            if (err) throw err;
                            console.log("deposit succesfuly");
                            db.close();


                        });
                    }
                    else {
                        console.log("sender has not sufficent money");
                        res.redirect("/transfermoneyRedirect");
                        db.close();
                    }
                }
                else {
					console.log("account close");
					   res.redirect("/transfermoneyRedirect");
                }

            });
        });
    });
})
app.get('/withdrawlRedirect', function (req, res) {
    res.sendFile(__dirname + "/" + "withdrawl.html");
})
app.get('/withdrawl.html', function (req, res) {
    res.sendFile(__dirname + "/" + "withdrawl.html");
})

app.get('/withdrawl', function (req, res) {
    // Prepare output in JSON format
    response = {
        account: req.query.acc,
        acbal: req.query.acbal
    };
 
    console.log(response);
   // res.end(JSON.stringify(response));
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://127.0.0.1:27017/pnb";

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var accstat, accbal;

        var dbase = db.db("pnb");

        console.log(response.account);
        //dbase.collection("employees").findOne({name: acc}, function(err, result){
        //dbo.collection("account").find(myquery).toArray(function(err, result)
        dbase.collection("account").findOne({ acc: response.account }, function (err, result) {
            if (err) throw err;
            console.log(result);
            console.log("result.acbal=" + result.acbal);
            balncewith = parseFloat(response.acbal);
            accstat = result.acstatus;
            acbal1 = parseFloat(result.acbal);
            accbal = acbal1 - balncewith;
            console.log("accstat=" + accstat);
            console.log("accbal=" + accbal);

            accountno = response.account;

            var MongoClient = require('mongodb').MongoClient;
            var url = "mongodb://127.0.0.1:27017/pnb";

            MongoClient.connect(url, function (err, db) {
                if (err) throw err;
                var myquery = { acc: accountno };

                var dbase = db.db("pnb");

                if (accstat === "N") {
                    console.log("sorry you have not sufficent amount");
                    res.redirect("/withdrawlRedirect");
                    db.close();
                }
                else if (accstat === "O") {
                    if (acbal1 > balncewith) {
                        var newvalues = { $set: { acbal: accbal } };
                        dbase.collection("account").updateOne(myquery, newvalues, function (err, res1) {
                            if (err) throw err;
                            console.log("withdraw is done");
                            res.redirect("/home");
                            db.close();

                        });
                    }
                    else {
                        console.log("sorry you have not sufficent amount");
                        res.redirect("/withdrawlRedirect");
                    }
                }
                else {
					console.log("account close");
					  res.redirect("/withdrawlRedirect");
                }

            });
        });
    });
})

app.get('/accountopen.html', function (req, res) {
    res.sendFile(__dirname + "/" + "accountopen.html");
})
app.get('/accountopen', function (req, res) {
    // Prepare output in JSON format
    response = {
        acc: req.query.acc,
        name: req.query.name,
        email: req.query.email,
        accounttype: req.query.accounttype,
        acstatus: "N",
        acbal: 0
    };
    console.log(response);
  //  res.end(JSON.stringify(response));
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/pnb";
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbase = db.db("pnb");
        //var myobj = { name: "Ajeet Kumar", age: "28", address: "Delhi" };  
        dbase.collection("account").insertOne(response, function (err, res1) {
            if (err) {
                throw err;
            } else {
                console.log("1 record inserted");
                //res.render("/index");

            }
            res.redirect("/home");
            db.close();
        });
    });

})

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)

})