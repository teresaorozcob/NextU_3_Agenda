<?php
  class ConectorBD
  {
    private $host = 'localhost';
    private $user = 'root'; //'user_schedule'; //'root';
    private $password = ''; //'Temporal*'; //'';
    private $nombre_db='agenda';

    private $conexion;


    //========================================= CRUD ======================//
    function getUsuario($user_email){
        $q="SELECT * FROM users WHERE user_email='".$user_email."'";
        return $this->ejecutarQuery($q);
        
    }

    function getEvents(){
        $q="SELECT * FROM events";
        return $this->ejecutarQuery($q);
        
    }


    //función para agregar registros a una tabla//->, de forma dinámica
    //insertData(<tableName>, <data_array>)
    function insertData($tableName, $data){ 
        $itPss = 0;
        //$query = "INSERT INTO ".$tableName." VALUES('tereSA@sabes', 'Tere', 'Bon', 'temporal')";
        //$query = "INSERT INTO '.$tableName.' (";
        $query = "INSERT INTO $tableName (";
        //columnas:
        $i = 1;
        foreach($data as $k => $value){
            $query .= $k;

            if($k == "user_password"){
                $itPss = $i;
            }

            if($i<count($data)){
                $query .= ', ';
            }else{
                $query .= ')';
            }
            $i++;
        }

        //values:
        $query .= ' VALUES  (';
        $i = 1;
        foreach($data as $k => $value){

            if($itPss == $i){
                $value = password_hash($value, PASSWORD_DEFAULT);
                $query .= "'".$value."'";
            }
            else{
                $query .= "'".$value."'";
            }
            
            if($i<count($data)){
                $query .= ', ';
            }else{
                $query .= ');';
            }
            $i++;
        }
        //echo $query;
        return $this->ejecutarQuery($query);        
    }



    function deleteEvento($idEvento){
        $query = "DELETE FROM events WHERE event_id = .$idEvento.";
        return $this->ejecutarQuery($query);
    }



    function updateEvento($idEvento){
        $query = "UPDATE events SET event_title = 'MAESTRÍA' WHERE event_id = 70";
        return $this->ejecutarQuery($query);
    }

/*
    function insertEvent($data){
        $itPss;
        //$query = "INSERT INTO ".$tableName." VALUES('tereSA@sabes', 'Tere', 'Bon', 'temporal')";
        $query = "INSERT INTO events (event_title) VALUES('maestria2')";
        
        //echo $query;
        return $this->ejecutarQuery($query);        
    }
*/


    //========================================= CNX ======================//
    function initConexion(){
        $this->conexion = new mysqli($this->host, $this->user, $this->password,$this->nombre_db);
        if ($this->conexion->connect_error) {
            return "Error:" . $this->conexion->connect_error;
        }else {
            return "OK";
        }
    }



    function ejecutarQuery($query){
        return $this->conexion->query($query);
    }

    function cerrarCnx(){
        $this->conexion->close();
    }

    function getConexion(){
        return $this->conexion;
    }


        //========================================= test ======================//

    //forma "PREPARE": XXX
    function insertData2($tableName, $data){ //FORMA PREPARE no me satisfizo, debido  a que lo tendría que hacer sobre cliente, si lo quiero hacer dinámico y eso no es funcional
        /*
        //echo $data["user_lastName"];
        
        $query = "INSERT INTO $tableName (";
        //columnas:
        $i = 1;
        foreach($data as $k => $value){
            $query .= $k;
            if($i<count($data)){
                $query .= ', ';
            }else{
                $query .= ')';
            }
            $i++;
        }

        //values:
        $query .= ' VALUES  (';
        $i = 1;
        foreach($data as $k => $value){
            $query .= "?";
            if($i<count($data)){
                $query .= ', ';
            }else{
                $query .= ');';
            }
            $i++;
        }

        $conexion->getConexion();

        $insert = $conexion->prepare($query);
        $insert->bind_param($user_email, $user_name, $user_lastName, $user_password);
*/



    }


  }





 ?>
