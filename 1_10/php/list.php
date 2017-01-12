<?php
$data = array(
    'bigTitle' => '今日头条',
    'list' => array(
        array(
            'id' => 1,
            'newTitle' => 'test1',
            'desc' => '3344555',
        ),
        array(
            'id' => 2,
            'newTitle' => 'test2',
            'desc' => 'fdasfasdf',
        ),
        array(
            'id' => 3,
            'newTitle' => 'test3',
            'desc' => 'fdasfasdf',
        ),
    ),
);
echo json_encode($data,true);