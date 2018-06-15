<?php
  include($_SERVER['DOCUMENT_ROOT']."/includes/include.php");
  if ($_SERVER['SERVER_ADDR'] != $_SERVER['REMOTE_ADDR']){
    http_response_code(400);
    exit;
  }
  $type = $_GET['type'];
  if($type == 'new'){
    $sql = 'SELECT COUNT(*) FROM articles';
    $results = $conn->query($sql);
    echo var_dump($results);
  }
?>
