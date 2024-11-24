<!-- resources/views/emails/timetable.blade.php -->

<h1>{{ $course->name }} Timetable</h1>
<table style="width: 100%; border-collapse: collapse;">
    <tr>
        <th>Day</th>
        <th>Time</th>
        <th>Subject</th>
    </tr>
    @foreach ($timetable as $entry)
        <tr>
            <td>{{ $entry->day }}</td>
            <td>{{ $entry->time }}</td>
            <td>{{ $entry->subject->name ?? 'N/A' }}</td>
        </tr>
    @endforeach
</table>
