'use strict';

var app = new Vue({
  el: "#app",
  data: {
    logfile: null,
    logfile_data: null,
    challenge_list: [
      ["NoDeath2Mission", "Complete 2 missions in a row without dying, at least 4 levels higher."],
      ["NoDeath3Mission", "Complete 3 missions in a row without dying, at least on your level."],
      ["NoSkill2Mission", "Complete 2 missions in a row without using Belt or Armour skills, at least 4 levels higher."],
      ["NoSkill3Mission", "Complete 3 missions in a row without using Belt or Armour skills, at least on your level."],
      ["NoWardrugMission", "Complete a mission without using the Inoculator, at least on your level."],
      ["Hard3Mission", "Complete 3 missions in a row, at least 4 levels higher."],
      ["Purge30Minutes", "Complete 2 Purge missions in a row within 30 minutes, at least 4 levels higher."],
      ["Kill10Elite", "Kill 10 Elite enemies without dying, at least on your level."],
      ["Kill5Villain", "Kill 5 Villain enemies without dying, at least on your level."],
      ["Kill200In1Minute", "Kill 200 enemies within 60 seconds, at least on your level."],
      ["Kill200In2Minute", "Kill 200 enemies within 120 seconds, at least 4 levels higher."],
      ["Kill10In1Minute", "Kill 10 Champion enemies within 60 seconds, at least on your level."],
      ["Kill10In2Minute", "Kill 10 Champion enemies within 120 seconds, at least 4 levels higher."],
    ],
  },
  computed: {
    completed_challenges: function() {
      //console.log('Computing challenges...');
      let s = this.logfile_data;
      if (s && s.length>0) {
        //console.log(s.length);
        let regex = /"allchallenge":{"items":\[([^}]+)\]/gm;
        let results = [...s.matchAll(regex)];
        let last = results[results.length-1];
        let challenges = String(last[1]).replace(/"/g,'').split(',');
        //console.log(challenges);
        return challenges;
      }
      return ["NoDeath2Mission","NoSkill2Mission"]
    },
  },
  methods: {
    has_challenge: function(name) {
      return this.completed_challenges.includes(name);
    },
    on_file_change: function(event) {
      this.logfile = event.target.files[0];
      //console.log('Setting up filereader...');
      let filereader = new FileReader(this.logfile);
      filereader.onload = this.on_file_load;
      filereader.readAsText(this.logfile);
    },
    on_file_load: function(event) {
      //console.log('File read.');
      let text = event.target.result;
      this.logfile_data = text;
    }
  },
});
