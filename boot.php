<?php 

if (rex::isBackend() && rex::getUser()) {  
 if (!rex_addon::get('minibar')->isAvailable()) {
            return '';
        }  
   rex_view::addJsFile(rex_addon::get('quick_navigation')->getAssetsUrl('MinibarTimeTrack.js'));
rex_minibar::getInstance()->addElement(new FriendsOfRedaxo\MinibarTimeTrack\MinibarTimeTrack());
}
