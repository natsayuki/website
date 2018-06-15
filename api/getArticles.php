<?php
  include($_SERVER['DOCUMENT_ROOT']."/includes/include.php");
  if ($_SERVER['SERVER_ADDR'] != $_SERVER['REMOTE_ADDR']){
    $this->output->set_status_header(400, 'No Remote Access Allowed');
    exit;
  }
  $type = $_GET['type'];
  if($type == 'new'){
    $sql = 'SELECT COUNT(*) FROM articles';
    $results = $conn->query($sql);
    echo var_dump($results);
  }
?>
