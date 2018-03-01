
$(function() {
	    var date = new Date();
		var d = date.getDate();
		var m = date.getMonth();
		var y = date.getFullYear(); 
		
		
		/*  className colors
		
		className: default(transparent), important(red), chill(pink), success(green), info(blue)
		
		*/		
		var calendar =  $('#calendar').fullCalendar({
			
			header: {
				left: 'title',
				center: 'agendaDay,agendaWeek,month',
				right: 'prev,next today'
			},
			dayClick: function(date, allDay, jsEvent, view) {
            $(this).css('background-color', 'white');
            var datetime = view.calendar.formatDate(date,'yyyyMMddhhmmss');
//          alert(datetime);
//          window.location="./../../addevent"+"/"+datetime;
//			location.assign("./../../addevent"+"/"+datetime);
           
           },
           eventClick: function(calEvent, jsEvent, view) {
              console.log(calEvent.id);
           window.location="./../../findevent"+"/"+calEvent.id;
           },
           
			editable: true,
			firstDay: 0, //  1(Monday) this can be changed to 0(Sunday) for the USA system
			selectable: true,
			defaultView: 'month',
			aspectRatio:1.5,
			axisFormat: 'h:mm',
			columnFormat: {
                month: 'ddd',    // Mon
                week: 'ddd d', // Mon 7
                day: 'dddd M/d',  // Monday 9/7
                agendaDay: 'dddd d'
            },
            titleFormat: {
                month: 'MMMM yyyy', // September 2009
                week: "MMMM yyyy", // September 2009
                day: 'MMMM yyyy'                  // Tuesday, Sep 8, 2009
            },
			allDaySlot: false,
			selectHelper: true,
			
			events: function(start,end,callback) {
        $.ajax({
				type:"get",
				url:"http://opm.shidaits.com/qywx/index.php/Home/service/getEvent",
				success:function(event){
					var events = [];
					var ent=JSON.parse(event);  //json串转json对象
					console.log(ent);
					for(var i = 0;i<ent.length;i++){
						var allDay = 'allDay';
						events.push({
							id:ent[i].id,
							title:ent[i].title,
							start:ent[i].start,
							end:ent[i].end,
							className:ent[i].className,
							allDay:allDay,
						});
					}
					try {
                                callback(events);   //回调

                            } catch (e) {

                                console.info(e);
                            }
				}
		});
     },
  });
});