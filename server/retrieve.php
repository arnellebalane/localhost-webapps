<?php

  $root = isset($_POST['root']) ? $_POST['root'] : '.';
  $path = '../../' . $root;
  $ignored_directories = array('.', '..', 'forbidden', 'restricted', 'xampp', 'localhost-webapps', 'codeigniter', 'my-libraries');
  $apps = array();

  if ($handle = opendir($path)) {
    while (($entry = readdir($handle))) {
      if (!strpos($entry, '.') && !in_array($entry, $ignored_directories)) {
        array_push($apps, $entry);
      }
    }
  }

  echo json_encode($apps)

?>