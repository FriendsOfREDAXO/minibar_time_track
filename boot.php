<?php 

if (rex::isBackend() && rex::getUser() {  
 if (!rex_addon::get('minibar')->isAvailable()) {
            return '';
        }  
rex_minibar::getInstance()->addElement(new FriendsOfRedaxo\MinibarTimeTrack\MinibarTimeTrack());
}
