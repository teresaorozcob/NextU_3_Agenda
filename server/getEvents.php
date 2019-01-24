<?php
     require('../server/db.php');
     $cnx = new ConectorBD();
 
//     $usr=$_POST["username"];
 
     $response['conexion'] = $cnx->initConexion();
 
     if($response['conexion'] == "OK"){
        $result= $cnx->getEvents();
        //$response["eventos"] = $result;


        $rows = array();
/*
        while($row = mysql_fetch_array($result){
            $rows[] = $row;

            foreach($rows as $row){
                $id = $row['event_id'];
                //$titulo = stripcslashes($row['event_title']);
            }
        }*/
        while($row = $result->fetch_array()){
            $rows[] = $row;

            foreach($rows as $row){
                $id = $row['event_id'];
                $titulo = stripcslashes($row['event_title']);
                $start = $row["event_dateStart"];
                $end = $row["event_dateEnd"];
                $allDay = $row["event_allDay"];
            }                
         } 




//         $row = $result->fetch_array(MYSQLI_ASSOC);
/*
         while($row = $result->fetch_array()){

            $titulo[] = $row["event_title"];
            $ini[] = $row["event_dateStart"];


            $row = $result->fetch_array(MYSQLI_ASSOC);
                                
         }    
*/

     //    $result ->free();

        

        /* while($row = mysql_fetch_array($res, MYSQL_NUM)){

            
         }*/
 

         /*$desc = array(); $views = array();

         while($row = $result->fetch_array()){

            $titulo[] = $row["event_title"];
            $ini[] = $row["event_dateStart"];


            $response=array("eventos"=>$row["event_title"]);
                                
         }    
         $res = array($desc, $views);
         $response["query"] = "OK";
         //$response["eventos"]=array($res);
         */
        $response["query"] = "OK";
        $response["eventos"] = $rows;//////
     }
 
     //echo json_encode($response, JSON_FORCE_OBJECT);
     echo json_encode($response);
     
     $cnx->cerrarCnx();
 
  



 ?>
