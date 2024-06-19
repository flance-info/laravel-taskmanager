<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Task;
use App\Http\Controllers\TaskController; 

class TaskControllerTest extends TestCase
{
    public function testIndex()
    {
        $tasks = Task::factory()->count(3)->create();

        $response = $this->get('/tasks');

        $response->assertOk();
        $response->assertViewHas('tasks', $tasks);
    }
    
    public function testStore()
    {
        $data = [
            'title' => 'New Task Title'
        ];

        $response = $this->post('/tasks', $data);

        $response->assertRedirect('/tasks');
        
        $this->assertDatabaseHas('tasks', [
            'title' => 'New Task Title'
        ]);
    }
}