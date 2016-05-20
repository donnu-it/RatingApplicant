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
        var querySpec = 'SELECT r.name, r.url, r.subjects FROM k JOIN r IN k.specialitions JOIN f IN r.subjects JOIN c IN r.subjects WHERE k.id = "Specialitions" AND f.idsubject IN ('+str+') AND f.requere = true AND c.idsubject IN ('+str+') AND c.requere = false AND f.idsubject != "Ukrainian language and literature"';
        self.taskDao.find(querySpec, function (err, items) {
            if (items.length > 0) {
                var n = items.length, B = [items[0]];
                for (var i = 1, j = 1; i < n; i++) {
                    if (items[i].name !== B[j - 1].name)
                        B[j++] = items[i];
                }
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
        var today = new Date();
        var year = today.getFullYear();
        res.render('index', {
            title: 'Донецький національний університет',
            year: year
        });
      }
};