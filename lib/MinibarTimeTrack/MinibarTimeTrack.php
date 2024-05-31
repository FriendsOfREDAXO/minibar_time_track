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

        #timer {
            font-size: 1em;
            cursor: pointer;
        }

        #reset, #copy, #calendar {
            background: none;
            border: none;
            font-size: 1em;
            cursor: pointer;
        }

        #reset {
            color: #f44336;
        }

        #copy {
            color: #2196F3;
        }

        #calendar {
            color: #4CAF50;
        }

        #message {
            color: #f44336;
            display: none;
            position: absolute;
            top: -30px;
            background: #eee;
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
