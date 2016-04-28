var DocumentDBClient = require('documentdb').DocumentClient;
var async = require('async');

function TaskList(taskDao) {
    this.taskDao = taskDao;
}

module.exports = TaskList;


TaskList.prototype = {

    showSubject:  function(req, res){

        var self = this;
        var subjects = JSON.stringify(req.body.title);

        var str = subjects.substr(1, subjects.length-2);
        console.log('body str: ' + str);
        var querySpec = 'SELECT r.name, r.subjects FROM r JOIN f IN r.subjects JOIN c IN r.subjects WHERE f.subject IN ('+str+') AND f.requere = true AND c.subject IN ('+str+') AND c.requere = false AND f.subject != "Українська мова та література"';
        console.log('body querySpec: ' + querySpec);
        self.taskDao.find(querySpec, function (err, items) {
            if (items.length > 1) {
                var n = items.length, B = [items[0]];
                for (var i = 1, j = 1; i < n; i++) {
                    if (items[i].name !== B[j - 1].name)
                        B[j++] = items[i];
                }
                items = B;
                console.log('body items: ' + B.length);
                res.send(res.render('table', {
                    tasks: B
                }));
            }
            else {
                res.send(res.render('intro'));
            }

        });

    },


    showTasks: function (req, res) {
        res.render('index', {
            title: 'Донецький національний університет'
        });
      },

    addTask: function (req, res) {
        var self = this;
        var item = req.body;

        self.taskDao.addItem(item, function (err) {
            if (err) {
                throw (err);
            }

            res.redirect('/');
        });
    },

    completeTask: function (req, res) {
        var self = this;
        var completedTasks = Object.keys(req.body);

        async.forEach(completedTasks, function taskIterator(completedTask, callback) {
            self.taskDao.updateItem(completedTask, function (err) {
                if (err) {
                    callback(err);
                } else {
                    callback(null);
                }
            });
        }, function goHome(err) {
            if (err) {
                throw err;
            } else {
                res.redirect('/');
            }
        });
    }
};