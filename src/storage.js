class Storage {
    static saveData(data) {
        localStorage.setItem("projectList", JSON.stringify(data))
    };
    static getData() {
        const projectList = JSON.parse(localStorage.getItem("projectList"));
        return projectList;
    };
    static dummyCheck() {
        if (JSON.parse(localStorage.getItem("projectList")) === null) {
            localStorage.setItem("projectList", JSON.stringify(dummyContent));
        };
    };
};

let dummyContent = [
    {
      "name": "Gym",
      "color": "#ef2929",
      "tasks": [
        {
          "name": "Max day",
          "date": "2022-05-06",
          "done": false
        },
        {
          "name": "Squat 180kg",
          "date": "",
          "done": false
        }
      ]
    },
    {
      "name": "Work",
      "color": "#fce94f",
      "tasks": [
        {
          "name": "Team meeting",
          "date": "2022-05-19",
          "done": false
        },
        {
          "name": "New project presentation",
          "date": "2022-05-31",
          "done": false
        },
        {
          "name": "Madeleine's bday",
          "date": "2022-08-17",
          "done": false
        },
        {
          "name": "Get cookies for the team",
          "date": "2022-04-06",
          "done": true
        }
      ]
    },
    {
      "name": "Chores",
      "color": "#204a87",
      "tasks": [
        {
          "name": "Wash the car",
          "date": "",
          "done": false
        },
        {
          "name": "Batteries for the remote",
          "date": "",
          "done": true
        },
        {
          "name": "New lightbulb for the bathroom",
          "date": "",
          "done": true
        }
      ]
    }
  ];

export {Storage};