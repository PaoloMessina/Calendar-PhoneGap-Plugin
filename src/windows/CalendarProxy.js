cordova.define("cordova-plugin-calendar.CalendarProxy", function(require, exports, module) {
    cordova.commandProxy.add("Calendar", {
        createEventWithOptions: function (successCallback, errorCallback, params) {
            console.log("Start event creation");
            var appointment = new Windows.ApplicationModel.Appointments.Appointment();

            appointment.startTime = new Date(params[0].startTime);
            appointment.duration = params[0].endTime - params[0].startTime;
            appointment.location = params[0].location;
            appointment.subject = params[0].title;
            appointment.details = params[0].notes;

            var selectionRect = {
                x: 0, y: 0,
                width: 200, height: 200
            };

            Windows.ApplicationModel.Appointments.AppointmentManager.showAddAppointmentAsync(appointment, selectionRect, Windows.UI.Popups.Placement.default).done(function (appointmentId) {
                if (appointmentId) {
                    successCallback({ id: appointmentId, msg: "Appointment added succesfully " });
                } else {
                    errorCallback({ msg: "Appointment not added" });
                }
            }, function (error) {
                errorCallback({ msg: error });
            });
        }
    });
});
