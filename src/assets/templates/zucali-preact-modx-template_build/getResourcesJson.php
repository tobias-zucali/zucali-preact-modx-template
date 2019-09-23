<?php
header('Access-Control-Allow-Origin: *');

if (!isset($modx)) return '';

$myId = $modx->resource->id;
$resources = $this->xpdo->getCollection('modResource', $this->xpdo->newQuery('modResource'));
$preparedResources = [];

$fieldsToEvaluate = [
  "content",
  "content_en",
  "teaser",
];


$PAGES_TO_EXCLUDE = [
  142,
  141,
];

if(!function_exists(getChunk)) {
  function getChunk($modx, $html, array $properties = array()) {
    $chunk = $modx->newObject('modChunk');
    $chunk->setCacheable(false);
	  return $chunk->process($properties, $html);
  }
}


if(!function_exists(cleanString)) {
  function cleanString($string) {
    if (is_string($string)) {
      $withoutScripts = preg_replace(
        '|<(\s*(\\\)?\s*/?\s*script[^>]*)>|i',
        '<!-- $1 cleaned by getResourceJson -->',
        $string
      );
      $withoutSnippets = preg_replace(
        '|\[\[([^\]]*)\]\]|',
        '<!-- snippet $1 cleaned by getResourceJson -->',
        $withoutScripts
      );
      return $withoutSnippets;
    } else {
      return $string;
    }
  }
}


foreach ($resources as $resource) {
  $objectArray = $resource->toArray();

  // prevent recursion
  if (!in_array($objectArray['id'], $PAGES_TO_EXCLUDE)) {
    $templateVarCollection = $resource->getTemplateVarCollection($resource);
    foreach ($templateVarCollection as $templateVar) {
      $objectArray[$templateVar->name] = $templateVar->value;
    }

    foreach ($fieldsToEvaluate as $field) {
      $objectArray[$field] = getChunk($modx, $objectArray[$field], array(
        "resource" => $objectArray['id'],
      ));
    }

  /*
    if ($objectArray['id'] === 23) {
  //	  $brokenSnippet = substr($objectArray['content'], 1430, 4);
      $brokenSnippet = $objectArray['content'];

      $objectArray = [
        content => $brokenSnippet,
      ];

      return json_encode(
      [$brokenSnippet],
      JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
      );
    }
  */
    array_push(
      $preparedResources,
      array_map(cleanString, $objectArray)
    );
  }
}

return json_encode(
  $preparedResources,
  JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
);
