 <?php

    require('../server/db.php');
    $cnx = new ConectorBD();

    $usr=$_POST["username"];
    $pss = $_POST["password"];

    $response['conexion'] = $cnx->initConexion();

    if($response['conexion'] == "OK"){
        $result= $cnx->getUsuario($usr);

        while($row = $result->fetch_assoc()){
            
            if(password_verify($pss, $row["user_password"])){
                $response["query"] = "OK";  
                
            } 
            else{
                $response["query"] = "NO";  
            }                      
        }      
    }

    echo json_encode($response);
    
    $cnx->cerrarCnx();






 ?>
