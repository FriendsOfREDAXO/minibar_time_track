<?php
/**
 * This file is part of the Quick Navigation package.
 *
 * @author (c) Friends Of REDAXO
 * @author <friendsof@redaxo.org>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FriendsOfRedaxo\MinibarTimeTrack;

use rex_minibar_element;
use rex_response;

class MinibarTimeTrack extends rex_minibar_element
{
    public function render(): string
    {

        return '
            <style nonce="' . rex_response::getNonce() . '">


        .timer-container {
            text-align: center;
        }

        #minibartimetrack-timer {
            font-size: 1em;
            cursor: pointer;
        }

        #minibartimetrack-reset, #minibartimetrack-copy, #minibartimetrack-calendar {
            background: none;
            border: none;
            font-size: 1em;
            cursor: pointer;
        }

        #minibartimetrack-reset {
            color: #f44336;
        }

        #minibartimetrack-copy {
            color: #2196F3;
        }

        #minibartimetrack-calendar {
            color: #4CAF50;
        }

            </style>
        <div class="rex-minibar-item">
        <div class="timer-container rex-minibar-value">
        <span id="timer">00:00:00</span>
        <button id="reset"><i class="fas fa-times"></i></button>
        <button id="copy"><i class="fas fa-copy"></i></button>
        <button id="calendar"><i class="fas fa-calendar-alt"></i></button>
        </div>
        </div>
            ';
    }

    public function getOrientation(): string
    {
        return rex_minibar_element::RIGHT;
    }
}
