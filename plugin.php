<?php
/**
 * Plugin Name: Hermit-X Blocks
 * Plugin URI: https://github.com/syfxlin/hermit-x-blocks
 * Description: Gutenberg blocks for Hermit-X
 * Author: Otstar Lin
 * Author URI: https://ixk.me
 * Version: 1.0.0
 * License: GPL3.0
 * License URI: https://www.gnu.org/licenses/gpl-3.0.txt
 */

// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit();
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path(__FILE__) . 'src/init.php';
