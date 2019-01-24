class EventsManager {
    constructor() {
        this.obtenerDataInicial()        
    }


    obtenerDataInicial() {
        let url = '../server/getEvents.php'
        $.ajax({
          url: url,
          dataType: "json",
          cache: false,
          processData: false,
          contentType: false,
          type: 'GET',
          success: (data) =>{
            if (data.query=="OK") {
              

              
              

              
              data.eventos.forEach(evento => {
                //alert("data query " + evento["event_dateStart"].substr(0, 10) +" " + "07:00");
                //alert(evento["event_dateStart"].substr(0, 10));
                //alert(evento["event_allDay"]);

                
                if (evento["event_allDay"] == "1") {
                  $('.calendario').fullCalendar('renderEvent', {
                    title: evento["event_title"],
                    start: evento["event_dateStart"].substr(0, 10),
                    allDay: true
                  })
                }else {
                  $('.calendario').fullCalendar('renderEvent', {
                    title: evento["event_title"],
                    start: evento["event_dateStart"].substr(0, 10) +" " + "07:00",
                    allDay: false,
                    end: evento["event_dateEnd"].substr(0, 10) +" " + "09:00"
                  })
                }
                
              });


           

              data.eventos = null;
              this.poblarCalendario(data.eventos);
              

             



              //poblar con info de eventos:
              /*$eventosList.forEach(element => {
                alert(element);
              });*/
              /*
              if (document.getElementById('allDay').checked) {
                $('.calendario').fullCalendar('renderEvent', {
                  title: $('#titulo').val(),
                  start: $('#start_date').val(),
                  allDay: true
                })
              }else {
                $('.calendario').fullCalendar('renderEvent', {
                  title: $('#titulo').val(),
                  start: $('#start_date').val()+" "+$('#start_hour').val(),
                  allDay: false,
                  end: $('#end_date').val()+" "+$('#end_hour').val()
                })
              }
              */




            }else {
              //alert("Error en data.query" + data.msg)
              //window.location.href = 'index.html';
            }
          },
          error: function(){
            alert("error en la comunicación con el servidor. obtenerDataInicial");
          }
        })

    }

    poblarCalendario(eventos) {
      alert("eventososs del caldenar", eventos)
        $('.calendario').fullCalendar({
            header: {
        		left: 'prev,next today',
        		center: 'title',
        		right: 'month,agendaWeek,basicDay'
        	},
        	defaultDate: '2019-01-01',
        	navLinks: true,
        	editable: true,
        	eventLimit: true,
          droppable: true,
          dragRevertDuration: 0,
          timeFormat: 'H:mm',
          eventDrop: (event) => {
              this.actualizarEvento(event)
          },
          events: eventos,
          eventDragStart: (event,jsEvent) => {
            $('.delete-btn').find('img').attr('src', "img/trash-open.png");
            $('.delete-btn').css('background-color', '#a70f19')
          },
          eventDragStop: (event,jsEvent) =>{
            var trashEl = $('.delete-btn');
            var ofs = trashEl.offset();
            var x1 = ofs.left;
            var x2 = ofs.left + trashEl.outerWidth(true);
            var y1 = ofs.top;
            var y2 = ofs.top + trashEl.outerHeight(true);
            if (jsEvent.pageX >= x1 && jsEvent.pageX<= x2 &&
                jsEvent.pageY >= y1 && jsEvent.pageY <= y2) {
                  this.eliminarEvento(event, jsEvent)
                  $('.calendario').fullCalendar('removeEvents', event.id);
            }

          }
        })
    }

    anadirEvento(){
      var form_data = new FormData();
      form_data.append('titulo', $('#titulo').val());

      form_data.append('start_date', $('#start_date').val())
      form_data.append('allDay', document.getElementById('allDay').checked)
      if (!document.getElementById('allDay').checked) {
        form_data.append('end_date', $('#end_date').val())
        form_data.append('end_hour', $('#end_hour').val())
        form_data.append('start_hour', $('#start_hour').val())
      }else {
        form_data.append('end_date', "")
        form_data.append('end_hour', "")
        form_data.append('start_hour', "")
      }
      

      
      $.ajax({
        url: '../server/new_event.php',
        dataType: "json",
        cache: false,
        processData: false,
        contentType: false,
        data: form_data,
        type: 'POST',
        success: function(php_response){
          if(php_response.conexion == "OK"){
            //alert("Evento guardado correctamente" + $('#start_date').val()+" "+$('#start_hour').val());


            if (document.getElementById('allDay').checked) {
              $('.calendario').fullCalendar('renderEvent', {
                title: $('#titulo').val(),
                start: $('#start_date').val(),
                allDay: true
              })
            }else {
              $('.calendario').fullCalendar('renderEvent', {
                title: $('#titulo').val(),
                start: $('#start_date').val()+" "+$('#start_hour').val(),
                allDay: false,
                end: $('#end_date').val()+" "+$('#end_hour').val()
              })
            }
            
          }
          else{
            alert("error: " + php_response.query);
          }
        },        
        error: function (request, status, error) {
            alert(request.responseText);
        }        
      });
      

    }

    anadirEvento2(){
      //alert("adding");

      /*var aaa = $('#titulo').val()
      alert(aaa);*/

      var form_data = new FormData();
      form_data.append('titulo', $('#titulo').val())
     /* form_data.append('start_date', $('#start_date').val())
      form_data.append('allDay', document.getElementById('allDay').checked)
      if (!document.getElementById('allDay').checked) {
        form_data.append('end_date', $('#end_date').val())
        form_data.append('end_hour', $('#end_hour').val())
        form_data.append('start_hour', $('#start_hour').val())
      }else {
        form_data.append('end_date', "")
        form_data.append('end_hour', "")
        form_data.append('start_hour', "")
      }
      */

      
      $.ajax({
        url: '../server/new_event.php',
        dataType: "json",
        cache: false,
        processData: false,
        contentType: false,
        data: form_data,
        type: 'POST',
        success: (data) =>{
          alert(data.msg);
          if (data.msg=="OK") {
            alert('Se ha añadido el evento exitosamente')
            if (document.getElementById('allDay').checked) {
              $('.calendario').fullCalendar('renderEvent', {
                title: $('#titulo').val(),
                start: $('#start_date').val(),
                allDay: true
              })
            }else {
              $('.calendario').fullCalendar('renderEvent', {
                title: $('#titulo').val(),
                start: $('#start_date').val()+" "+$('#start_hour').val(),
                allDay: false,
                end: $('#end_date').val()+" "+$('#end_hour').val()
              })
            }




          }else {
            alert(data.msg)
          }
        },        
        error: function(){
          alert("error en la comunicación con el servidor. anadirEvento");
        }
      })

    }

    eliminarEvento(event, jsEvent){

      var form_data = new FormData()
      form_data.append('id', event.id)
      $.ajax({
        url: '../server/delete_event.php',
        dataType: "json",
        cache: false,
        processData: false,
        contentType: false,
        data: form_data,
        type: 'POST',
        success: (data) =>{
          if (data.msg=="OK") {
            alert('Se ha eliminado el evento exitosamente')
          }else {
            alert(data.msg)
          }
        },
        error: function(){
          alert("error en la comunicación con el servidor. eliminarEvento");
        }
      })
      $('.delete-btn').find('img').attr('src', "img/trash.png");
      $('.delete-btn').css('background-color', '#8B0913')
    }

    actualizarEvento(evento) {
        let id = evento.id,
            start = moment(evento.start).format('YYYY-MM-DD HH:mm:ss'),
            end = moment(evento.end).format('YYYY-MM-DD HH:mm:ss'),
            form_data = new FormData(),
            start_date,
            end_date,
            start_hour,
            end_hour

        start_date = start.substr(0,10)
        end_date = end.substr(0,10)
        start_hour = start.substr(11,8)
        end_hour = end.substr(11,8)


        form_data.append('id', id)
        form_data.append('start_date', start_date)
        form_data.append('end_date', end_date)
        form_data.append('start_hour', start_hour)
        form_data.append('end_hour', end_hour)

        $.ajax({
          url: '../server/update_event.php',
          dataType: "json",
          cache: false,
          processData: false,
          contentType: false,
          data: form_data,
          type: 'POST',
          success: (data) =>{
            if (data.msg=="OK") {
              alert('Se ha actualizado el evento exitosamente')
            }else {
              alert(data.msg)
            }
          },
          error: function(){
            alert("error en la comunicación con el servidor. actualizarEvento");
          }
        })
    }

}


$(function(){
  initForm();
  var e = new EventsManager();
  $('form').submit(function(event){
    

    event.preventDefault()
    e.anadirEvento()
  })
});



function initForm(){
  $('#start_date, #titulo, #end_date').val('');
  $('#start_date, #end_date').datepicker({
    dateFormat: "yy-mm-dd"
  });
  $('.timepicker').timepicker({
    timeFormat: 'HH:mm',
    interval: 30,
    minTime: '5',
    maxTime: '23:30',
    defaultTime: '7',
    startTime: '5:00',
    dynamic: false,
    dropdown: true,
    scrollbar: true
  });
  $('#allDay').on('change', function(){
    if (this.checked) {
      $('.timepicker, #end_date').attr("disabled", "disabled")
    }else {
      $('.timepicker, #end_date').removeAttr("disabled")
    }
  })

}
