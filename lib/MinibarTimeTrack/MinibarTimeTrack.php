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
            font-family: Courier New;
            cursor: pointer;
        }

        #minibartimetrack-reset, #minibartimetrack-copy, #minibartimetrack-calendar {
            background: none;
            cursor: pointer;
            border: 0;
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
        <span id="minibartimetrack-timer">00:00:00</span>
        <button id="minibartimetrack-reset"><i class="fas fa-times"></i></button>
        <button id="minibartimetrack-copy"><i class="fas fa-copy"></i></button>
        <button id="minibartimetrack-calendar"><i class="fas fa-calendar-alt"></i></button>
        </div>
        </div>
            ';
    }

    public function getOrientation(): string
    {
        return rex_minibar_element::RIGHT;
    }
}
