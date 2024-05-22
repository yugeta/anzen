<?php

switch(@$_POST['mode']){
  case 'get_lists':
    require_once 'lists.php';
    new Lists();
    break;
}