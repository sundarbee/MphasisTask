var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var Sqlite = require("nativescript-sqlite");
var Dialogs = require("ui/dialogs");

function createViewModel(database, listId) {
    var viewModel = new Observable();
    viewModel.proposal = new ObservableArray([]);
    viewModel.listId = listId;

    viewModel.insert = function() {
        Dialogs.prompt("Proposal Name", "").then(result => {
            database.execSQL("INSERT INTO proposal (list_id, proposal_name) VALUES (?, ?)", [this.listId, result.text]).then(id => {
                this.proposal.push(result.text);
            }, error => {
                console.log("INSERT ERROR", error);
            });
        });
    }

    viewModel.select = function() {
        this.proposal = new ObservableArray([]);
        database.all("SELECT proposal_name FROM proposals WHERE list_id = ?", [this.listId]).then(rows => {
            for(var row in rows) {
                this.proposals.push(rows[row]);
            }
        }, error => {
            console.log("SELECT ERROR", error);
        });
    }

    viewModel.select();

    return viewModel;
}

exports.createViewModel = createViewModel;
