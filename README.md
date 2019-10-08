# Train Scheduler

Train Scheduler is an app that allows users to create and delete fictional trains schedule.


The Train Scheduler Application begins with a form that requests the train name, destination, first train time, and frequency. Once entered, the train is stored in [Firebase](https://firebase.google.com/) database and placed in the current train schedule. The frequency, arrival time, and minutes away is determined by [MomentJS](https://momentjs.com/) javascript library. Trains can then be removed from the table.

This app gets reloaded after every 60 seconds and hence the `minutes away` data is reloaded after every 60 seconds.

`Technologies Used: HTML, CSS, Javascript, Bootstrap, Firebase, MomentJS, jQuery`
