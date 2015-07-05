<?php

/**
 * @file
 * template.php
 */

include_once('theme/system/html.vars.php');

// Don't include formatting options on the form. We'll just use
// limited HTML.
function legolas_form_comment_form_alter(&$form, &$form_state) {
  $form['comment_body']['#after_build'][] = 'legolas_customize_comment_form';
}

function legolas_customize_comment_form(&$form) {
  $form[LANGUAGE_NONE][0]['format']['#access'] = FALSE;
  return $form;
}