<?php

class Save{
  public static $dir = 'data/sds/';

  function __construct($id=null , $json=''){
    if(!$json){return;}
    $this->data = json_decode($json,true);
    $this->id = $id ? $id : $this->create_id();
    $this->json = $json;
    $this->make_dir();
    $this->data_save();
    $this->location();
  }

  private function create_id(){
    return date('YmdHis') .'_'. $this->data['writer_email'];
  }

  private function get_data_path(){
    return self::$dir . $this->id .'.json';
  }

  private function make_dir(){
    if(is_dir(self::$dir)){return;}
    mkdir(self::$dir , 0755 , true);
  }

  private function data_save(){
    file_put_contents($this->get_data_path() , $this->json);
  }

  private function location(){
    header('Location: ./?p=sds_create&id='.$this->id);
  }
}