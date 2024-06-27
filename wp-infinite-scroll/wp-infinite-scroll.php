<?php
/*
Plugin Name: WP Infinite Scroll Pages
Plugin URI: https://eris.nu
Description:
Version: 1.0.0
Author: Jaap Marcus
Author URI: https://eris.nu
Text Domain: -
*/

class WP_Infinite_Scroll
{
  public const NAME = 'wp-infinite-scroll';
  public const VERSION = '1.0.0';

  private static $instance = null;
  public static $plugin_basename = null;
  public static $is_configured = false;

  public static function get_instance()
  {
    if (!self::$instance) {
      self::$instance = new self();
    }
  
    return self::$instance;
  }
  
  function __construct(){
      add_action('init', array($this, 'init'));			
  }
  
  function init(){
    add_action('wp_footer',array($this, 'addFooter'));
    add_filter( 'the_content', array($this, 'infiniteScroll'));
  }
  
  function create_link($i){
    global $wp_rewrite;
    $post       = get_post();
    $query_args = array();
    
    if (1 == $i) {
        $url = get_permalink();
    } else {
        if (! get_option('permalink_structure') || in_array($post->post_status, array( 'draft', 'pending' ), true)) {
            $url = add_query_arg('page', $i, get_permalink());
        } elseif ('page' === get_option('show_on_front') && get_option('page_on_front') == $post->ID) {
            $url = trailingslashit(get_permalink()) . user_trailingslashit("$wp_rewrite->pagination_base/" . $i, 'single_paged');
        } else {
            $url = trailingslashit(get_permalink()) . user_trailingslashit($i, 'single_paged');
        }
    }
    
    if (is_preview()) {
        if (('draft' !== $post->post_status) && isset($_GET['preview_id'], $_GET['preview_nonce'])) {
            $query_args['preview_id']    = wp_unslash($_GET['preview_id']);
            $query_args['preview_nonce'] = wp_unslash($_GET['preview_nonce']);
        }
    
        $url = get_preview_post_link($post, $query_args, $url);
    }
    return esc_url($url);
  }
  
  function infiniteScroll($content){
    global $page, $numpages, $multipage, $more;
    if($multipage !== 0){
      if($page < $numpages){
        $url = $this -> create_link($page + 1);
        $div = '<div id="infinite-scroll" data-href="'.$url.'"></div>';
        $content = $content . $div;
      }else{
        if (function_exists ('adinserter')) echo adinserter (3);
      }
    }
    return $content;
  }
  
  function addFooter(){
    wp_enqueue_script('infinite_scroll', plugins_url("wp-infinite-scroll/scroll.js"), array(),$this::VERSION, false);
    
  }
}

WP_Infinite_Scroll::get_instance();
  
//Disable default paginated pages links
function disable_wp_links(){
  return;
}
add_filter('wp_link_pages', 'disable_wp_links');	

//Add Function to see if page is paginated
function is_paginated_page(){
  global $multipage; 
  return $multipage !== 0;
}