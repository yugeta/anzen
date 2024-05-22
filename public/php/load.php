<?php
require_once 'save.php';

class Load{
  function __construct($id=null){
    if(!$id){return;}
    $this->id = $id;
    if(!is_file($this->get_data_path())){return;}
    // echo 'load: '.$id." / ". Save::$dir;
    echo $this->data_load();
  }

  private function get_data_path(){
    return Save::$dir . $this->id .'.json';
  }

  private function data_load(){
    $path = $this->get_data_path();
    return file_get_contents($path);
  }

}