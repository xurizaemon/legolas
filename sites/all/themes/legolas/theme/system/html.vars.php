<?php
/**
 * @file
 * html.vars.php
 *
 * @see html.tpl.php
 */

/**
 * Implements hook_preprocess_html().
 */
function fizzy_preprocess_html(&$variables) {
    $breadcrumb = menu_get_active_breadcrumb();
    if (sizeof($breadcrumb) > 1) {
        $variables['classes_array'][] = 'with-breadcrumb';
    }
    else {
        $variables['classes_array'][] = 'without-breadcrumb';
    }
    switch (theme_get_setting('bootstrap_navbar_position')) {
    case 'fixed-top':
      $variables['classes_array'][] = 'navbar-is-fixed-top';
      break;

    case 'fixed-bottom':
      $variables['classes_array'][] = 'navbar-is-fixed-bottom';
      break;

    case 'static-top':
      $variables['classes_array'][] = 'navbar-is-static-top';
      break;
  }
}
