<?php
//hay dos formas: PDO y MySQLi

    require('../server/db.php');

    $cnx = new ConectorBD();

    if($cnx->initConexion() == 'OK'){
        //echo "Conexión exitosa al servidor de Base de Datos";
        $conexion = $cnx->getConexion();

        //creando usuarios:
        //forma 1tradicional:
        //if($cnx->insertData()){
        //usr 1:
        $datos["user_email"] = "teresa@sabes";
        $datos["user_name"] = "teresa";
        $datos["user_lastName"] = "bon";
        $datos["user_password"] = "temporal";

        //$cnx->insertData('users', $datos);
        if($cnx->insertData('users', $datos)){
            echo "Se insertó correctamente el usuario: ".$datos["user_email"];
        }else{
            echo "Error al insertar el registro del usuario: ".$datos["user_email"];
        }

        //usr 2:
        $datos["user_email"] = "luis@sabes";
        $datos["user_name"] = "luis";
        $datos["user_lastName"] = "bon";
        $datos["user_password"] = "temporal";

        if($cnx->insertData('users', $datos)){
            echo "Se insertó correctamente el usuario: ".$datos["user_email"];
        }else{
            echo "Error al insertar el registro del usuario: ".$datos["user_email"];
        }

        //usr 3:
        $datos["user_email"] = "vera@sabes";
        $datos["user_name"] = "vera";
        $datos["user_lastName"] = "bon";
        $datos["user_password"] = "temporal";

        if($cnx->insertData('users', $datos)){
            echo "Se insertó correctamente el usuario: ".$datos["user_email"];
        }else{
            echo "Error al insertar el registro del usuario: ".$datos["user_email"];
        }

        //usr 4:
        $datos["user_email"] = "jose@sabes";
        $datos["user_name"] = "jose";
        $datos["user_lastName"] = "bon";
        $datos["user_password"] = "temporal";

        if($cnx->insertData('users', $datos)){
            echo "Se insertó correctamente el usuario: ".$datos["user_email"];
        }else{
            echo "Error al insertar el registro del usuario: ".$datos["user_email"];
        }
        
        /*
        //con "prepare":
        //usr 1:
        $datos["user_email"] = "teresa@sabes";
        $datos["user_name"] = "teresa";
        $datos["user_lastName"] = "bon";
        $datos["user_password"] = "temporal";
        
        if($cnx->insertData('users', $datos)){
            echo "Se insertó correctamente el usuario: ".$datos["user_email"];
        }else{
            echo "Error al insertar el registro del usuario: ".$datos["user_email"];
        }
        */


        //$cnx->cerrarCnx();
        
    }else{
        echo "Problemas con Conexión al servidor de Base de Datos";
    }






 ?>
  