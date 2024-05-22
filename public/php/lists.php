<?php

class Lists{
  var $file_setting = '../data/setting.json';
  public static $dir = '../data/sds/';

  var $auth_users = [];

  function __construct(){
    $this->auth_users = $this->load_auth_users();
    $lists = $this->get_files(@$_POST['mail'] , $this->is_auth_user(@$_POST['mail']));
    $this->res($lists);
  }

  private function get_files($mail=null , $is_auth_user=false){
    if(!is_dir(Lists::$dir)){return;}
    $files = scandir(Lists::$dir);
    $lists = [];
    for($i=0,$c=count($files); $i<$c; $i++){
      if($files[$i] === '.' || $files[$i] === '..'){continue;}
      if(!preg_match('/(.+?)\.json$/' , $files[$i] , $match)){continue;}
      $file_data = $this->get_data($files[$i]);
      if($is_auth_user
      || ($mail
      && $file_data 
      && isset($file_data['writer_email']) 
      && $file_data['writer_email'] 
      && $file_data['writer_email'] === $mail)){
        $file_data['filename'] = $files[$i];
        $file_data['id'] = $match[1];
        array_push($lists , $file_data);
      }
      // if($mail
      // && $file_data 
      // && isset($file_data['writer_email']) 
      // && $file_data['writer_email'] 
      // && $file_data['writer_email'] !== $mail){continue;}
      // $file_data['filename'] = $files[$i];
      // $file_data['id'] = $match[1];
      // array_push($lists , $file_data);
    }
    return $lists;
  }

  private function get_data($filename=''){
    $path = Lists::$dir . $filename;
    $json = file_get_contents($path);
    return json_decode($json , true);
  }

  private function res($res=null){
    echo json_encode($res , JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
  }

  private function load_auth_users(){
    if(!is_file($this->file_setting)){return [];}
    $json = file_get_contents($this->file_setting);
    $data = json_decode($json , true);
    return $data["auth_users"];
  }

  private function is_auth_user($mail=null){
    if($mail && in_array($mail , $this->auth_users)){
      return true;
    }
  }
} 