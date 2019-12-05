# Train Scheduler

Train Scheduler is an app that allows users to create and delete fictional trains schedule.

### Overview
The Train Scheduler Application begins with a form that requests the train name, destination, first train time, and frequency. Once entered, the train is stored in [Firebase](https://firebase.google.com/) database and is displayed under 'Current train schedule' section. The frequency, arrival time, and minutes away is determined by [MomentJS](https://momentjs.com/) javascript library. Trains can then be removed from the table.

This app gets reloaded after every 60 seconds and hence the `Minutes Away` data is reloaded after every 60 seconds.

### Live Demo
Click [here](https://pshegde123.github.io/TrainScheduler.github.io/) to see the demo.

### Technologies Used
* `HTML`,
* `CSS`, 
* `Javascript`,
* `Bootstrap`, 
* `Firebase`, 
* `MomentJS`, 
* `jQuery`
