<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskCollection;
use App\Http\Resources\TaskResource;
use App\Http\Resources\TasksCollection;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;


class TaskController extends Controller {
    protected $task;

    public function __construct( Task $task ) {
        $this->task = $task;
    }

    public function index( Request $request ) {
        $validatedData = $request->validate( [
            'status'     => 'nullable|string',
            'due_date'   => 'nullable|array',
            'due_date.*' => 'nullable|date_format:Y-m-d\TH:i:s.\0\0\0\Z',
            'per_page'   => 'nullable|integer|min:1',
        ] );
        $query = $this->task->query();
        if ( $request->has( 'status' ) ) {
            $query->where( 'status', $validatedData['status'] );
        }
        if ( $request->has( 'due_date' ) ) {
            if ( count( $validatedData['due_date'] ) === 1 ) {
                $startDate = Carbon::parse( $validatedData['due_date'][0] )->startOfDay();
                // Filter tasks where due_date is greater than or equal to $startDate
                $query->where( 'due_date', '>=', $startDate );
            } elseif ( count( $validatedData['due_date'] ) === 2 ) {
                $startDate = Carbon::parse( $validatedData['due_date'][0] )->startOfDay();
                $endDate   = Carbon::parse( $validatedData['due_date'][1] )->endOfDay();
                $query->whereBetween('due_date', [$startDate, $endDate]);
            } else {
                \Log::warning( 'Invalid due_date format:', $validatedData['due_date'] );
            }
        }
        $perPage = $validatedData['per_page'] ?? 10;
        $tasks   = $query->paginate( $perPage );

        return TasksCollection::make($tasks);
    }

    public function store( Request $request ) {
        $validatedData = $request->validate( [
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string',
            'status'     => 'nullable|string',
            'due_date'    => 'required|date_format:Y-m-d',
        ] );
        $task = $this->task->create( $validatedData );

        return new TaskResource($task);
    }

    public function show( $id ) {
        $task = $this->task->findOrFail( $id );

        return new TaskResource($task);
    }

    public function update( Request $request, $id ) {
        $validator = Validator::make( [ 'id' => $id ], [
            'id' => 'required|integer|exists:tasks,id'
        ] );
        if ( $validator->fails() ) {
            return response()->json( [ 'error' => $validator->errors() ], 400 );
        }
        $validatedData = $request->validate( [
            'title'       => 'string|max:255',
            'description' => 'nullable|string',
            'status'     => 'nullable|string',
            'due_date'    => 'date_format:Y-m-d',
        ] );
        $task = $this->task->findOrFail( $id );
        $task->update( $validatedData );

        return new TaskResource($task);
    }

    public function destroy( $id ) {
        $task = $this->task->findOrFail( $id );
        $task->delete();

        return response()->json( null, 204 );
    }
}
