<?php
    
    require('../server/db.php');
    $cnx = new ConectorBD();

    $id=$_POST["id"];

    $response['conexion'] = $cnx->initConexion();

    if($response['conexion'] == "OK"){
        $result= $cnx->updateEvento($id);

        $response["msg"] = "OK";

            
    }

    echo json_encode($response, JSON_FORCE_OBJECT);
    
    $cnx->cerrarCnx();






 ?>
