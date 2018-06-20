<?php
  include($_SERVER['DOCUMENT_ROOT']."/includes/include.php");
  // if ($_SERVER['SERVER_ADDR'] != $_SERVER['REMOTE_ADDR']){
    // http_response_code(400);
  //   echo "uh oh";
  //   exit;
  // }
  if(isset($_GET['type'])){
    $type = $_GET['type'];
  }
  else{
    $type = $_POST['type'];
  }
  if($type == 'new'){
    $sql = 'SELECT * FROM articles';
    $results = $conn->query($sql);
    $count = $results->num_rows;
    $max = $count - 20;
    if($max < 0){
      $max = 0;
    }
    // $sql = 'SELECT * FROM articles WHERE `key` BETWEEN ' . $max . ' AND ' . $count;
    $sql = 'SELECT * FROM articles';
    $results = $conn->query($sql);
    if($results->num_rows > 0){
      $rows = array();
      while($row = $results ->fetch_assoc()){
        if(is_string($row)){
          $row = mb_convert_encoding($row, 'UTF-8', 'UTF-8');
        }
        array_push($rows, $row);
      }
      echo json_encode($rows);
    }
    if($conn->error){
      echo $conn->error;
    }
  }
  else if($type == 'views'){
    $num = $_POST['num'];
    $sql = 'UPDATE articles SET views = views + 1 WHERE `key` = ' . $num;
    $conn->query($sql);
  }
?>
