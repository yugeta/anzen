<?php

switch(@$_POST['mode']){
  case 'load':
    require_once 'php/load.php';
    new Load(@$_POST['id']);
    break;

  case 'save':
    require_once 'php/save.php';
    new Save(@$_POST['id'] , @$_POST['json']);
    break;
}