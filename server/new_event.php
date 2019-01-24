<?php
    require('../server/db.php');
    $cnx = new ConectorBD();
    
    $response['conexion'] = $cnx->initConexion();

    $datos["event_title"] = $_POST["titulo"];
    $datos["event_dateStart"] = $_POST["start_date"];
    $datos["event_dateEnd"] = $_POST["end_date"];
    $datos["event_allDay"] = $_POST["allDay"];


    if($response['conexion'] == "OK"){
        if($cnx->insertData('events', $datos)){
            $response['query'] = "OK";
        }
        else{
            $response['query'] = "Error al intentar guardar evento";
        }
    }
   
    //$cnx->insertData('events', $datos);
    /*
    if($cnx->initConexion() == "OK"){
    //if($response['conexion'] == "OK"){
        $response['query'] = "siconnection";
        //$cnx->insertData('events', $datos);
       // $response['query'] = "OK";

//        $result = $cnx->insertData('events', $data)
/*
        if($cnx->insertData('events', $datos)){
            $response['query'] = "Insert OK");
        }
        else{
            $response['query'] = "NO Insert");
        }
      */  
        //$result = $cnx->insertData('events', $data);

       /* $rrr = $cnx->insertData('events', $data);

        $response['msg'] = $rrr;*--/
        
    }
    else{
       // $response['conexion'] = $response['conexion'];
        $response['query'] = "NOconnection");
    }*/

    //$response['query'] = "OK");

    echo json_encode($response);
    
    $cnx->cerrarCnx();


 ?>
