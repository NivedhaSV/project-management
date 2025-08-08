import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TaskDialog } from '@/components/tasks/TaskDialog';
import { TaskSchema } from '@/lib/schema';
import { mockTasks, mockUsers } from '@/data/mockData';
import { vi, describe, it, expect, beforeEach } from 'vitest';

// Mock data
const mockTask = {
  ...mockTasks[0],
  id: 'task-1',
  title: 'Test Task',
  description: 'Test Description',
  status: 'todo' as const,
  priority: 'medium' as const,
  projectId: 'proj-1',
  userStoryId: 'story-1',
  sprintId: 'sprint-1',
  reporterId: '1',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const mockProjectId = 'proj-1';
const mockUserStoryId = 'story-1';
const mockSprintId = 'sprint-1';

describe('Task Editing Functionality', () => {
  const mockOnTaskUpdated = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    // Reset fetch mock
    (global.fetch as jest.Mock).mockReset();
  });

  it('should successfully edit an existing task with valid data', async () => {
    render(
      <TaskDialog
        mode="edit"
        projectId={mockProjectId}
        userStoryId={mockUserStoryId}
        sprintId={mockSprintId}
        task={mockTask}
        onTaskUpdated={mockOnTaskUpdated}
        trigger={<button>Edit Task</button>}
      />
    );

    // Open the dialog
    fireEvent.click(screen.getByText('Edit Task'));

    // Update task fields
    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: 'Updated Task Title' },
    });

    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: 'Updated task description' },
    });

    // Select new status
    fireEvent.click(screen.getByLabelText(/status/i));
    fireEvent.click(screen.getByText('In Progress'));

    // Select new priority
    fireEvent.click(screen.getByLabelText(/priority/i));
    fireEvent.click(screen.getByText('High'));

    // Set due date
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    fireEvent.change(screen.getByLabelText(/due date/i), {
      target: { value: tomorrow.toISOString().slice(0, 16) },
    });

    // Set story points
    fireEvent.change(screen.getByLabelText(/story points/i), {
      target: { value: '5' },
    });

    // Submit the form
    fireEvent.click(screen.getByText('Save Changes'));

    // Verify the update callback was called with correct data
    await waitFor(() => {
      expect(mockOnTaskUpdated).toHaveBeenCalledWith(
        expect.objectContaining({
          id: mockTask.id,
          title: 'Updated Task Title',
          description: 'Updated task description',
          status: 'inprogress',
          priority: 'high',
          storyPoints: 5,
        })
      );
    });
  });

  it('should show validation errors when submitting invalid data', async () => {
    render(
      <TaskDialog
        mode="edit"
        projectId={mockProjectId}
        userStoryId={mockUserStoryId}
        sprintId={mockSprintId}
        task={mockTask}
        onTaskUpdated={mockOnTaskUpdated}
        trigger={<button>Edit Task</button>}
      />
    );

    // Open the dialog
    fireEvent.click(screen.getByText('Edit Task'));

    // Clear required fields
    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: '' },
    });

    // Submit the form
    fireEvent.click(screen.getByText('Save Changes'));

    // Verify validation errors are shown
    await waitFor(() => {
      expect(screen.getByText(/title is required/i)).toBeInTheDocument();
    });

    // Verify update callback was not called
    expect(mockOnTaskUpdated).not.toHaveBeenCalled();
  });

  it('should not allow task title to exceed maximum length', async () => {
    render(
      <TaskDialog
        mode="edit"
        projectId={mockProjectId}
        userStoryId={mockUserStoryId}
        sprintId={mockSprintId}
        task={mockTask}
        onTaskUpdated={mockOnTaskUpdated}
        trigger={<button>Edit Task</button>}
      />
    );

    // Open the dialog
    fireEvent.click(screen.getByText('Edit Task'));

    // Enter a title that exceeds the maximum length
    const longTitle = 'a'.repeat(101); // Max length is 100
    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: longTitle },
    });

    // Submit the form
    fireEvent.click(screen.getByText('Save Changes'));

    // Verify validation error is shown
    await waitFor(() => {
      expect(screen.getByText(/title cannot exceed 100 characters/i)).toBeInTheDocument();
    });

    // Verify update callback was not called
    expect(mockOnTaskUpdated).not.toHaveBeenCalled();
  });

  it('should not allow description to exceed maximum length', async () => {
    render(
      <TaskDialog
        mode="edit"
        projectId={mockProjectId}
        userStoryId={mockUserStoryId}
        sprintId={mockSprintId}
        task={mockTask}
        onTaskUpdated={mockOnTaskUpdated}
        trigger={<button>Edit Task</button>}
      />
    );

    // Open the dialog
    fireEvent.click(screen.getByText('Edit Task'));

    // Enter a description that exceeds the maximum length
    const longDescription = 'a'.repeat(501); // Max length is 500
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: longDescription },
    });

    // Submit the form
    fireEvent.click(screen.getByText('Save Changes'));

    // Verify validation error is shown
    await waitFor(() => {
      expect(screen.getByText(/description cannot exceed 500 characters/i)).toBeInTheDocument();
    });

    // Verify update callback was not called
    expect(mockOnTaskUpdated).not.toHaveBeenCalled();
  });

  it('should not allow invalid characters in title', async () => {
    render(
      <TaskDialog
        mode="edit"
        projectId={mockProjectId}
        userStoryId={mockUserStoryId}
        sprintId={mockSprintId}
        task={mockTask}
        onTaskUpdated={mockOnTaskUpdated}
        trigger={<button>Edit Task</button>}
      />
    );

    // Open the dialog
    fireEvent.click(screen.getByText('Edit Task'));

    // Enter a title with invalid characters
    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: 'Invalid@#$%Title' },
    });

    // Submit the form
    fireEvent.click(screen.getByText('Save Changes'));

    // Verify validation error is shown
    await waitFor(() => {
      expect(screen.getByText(/title can only contain letters, numbers, spaces, hyphens, and underscores/i)).toBeInTheDocument();
    });

    // Verify update callback was not called
    expect(mockOnTaskUpdated).not.toHaveBeenCalled();
  });

  it('should not allow past due dates', async () => {
    render(
      <TaskDialog
        mode="edit"
        projectId={mockProjectId}
        userStoryId={mockUserStoryId}
        sprintId={mockSprintId}
        task={mockTask}
        onTaskUpdated={mockOnTaskUpdated}
        trigger={<button>Edit Task</button>}
      />
    );

    // Open the dialog
    fireEvent.click(screen.getByText('Edit Task'));

    // Set a past due date
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    fireEvent.change(screen.getByLabelText(/due date/i), {
      target: { value: yesterday.toISOString().slice(0, 16) },
    });

    // Submit the form
    fireEvent.click(screen.getByText('Save Changes'));

    // Verify validation error is shown
    await waitFor(() => {
      expect(screen.getByText(/due date must be in the future/i)).toBeInTheDocument();
    });

    // Verify update callback was not called
    expect(mockOnTaskUpdated).not.toHaveBeenCalled();
  });

  it('should not allow invalid story points', async () => {
    render(
      <TaskDialog
        mode="edit"
        projectId={mockProjectId}
        userStoryId={mockUserStoryId}
        sprintId={mockSprintId}
        task={mockTask}
        onTaskUpdated={mockOnTaskUpdated}
        trigger={<button>Edit Task</button>}
      />
    );

    // Open the dialog
    fireEvent.click(screen.getByText('Edit Task'));

    // Set invalid story points
    fireEvent.change(screen.getByLabelText(/story points/i), {
      target: { value: '14' }, // Max is 13
    });

    // Submit the form
    fireEvent.click(screen.getByText('Save Changes'));

    // Verify validation error is shown
    await waitFor(() => {
      expect(screen.getByText(/story points cannot exceed 13/i)).toBeInTheDocument();
    });

    // Verify update callback was not called
    expect(mockOnTaskUpdated).not.toHaveBeenCalled();
  });

  it('should maintain existing task data when canceling edit', async () => {
    render(
      <TaskDialog
        mode="edit"
        projectId={mockProjectId}
        userStoryId={mockUserStoryId}
        sprintId={mockSprintId}
        task={mockTask}
        onTaskUpdated={mockOnTaskUpdated}
        trigger={<button>Edit Task</button>}
      />
    );

    // Open the dialog
    fireEvent.click(screen.getByText('Edit Task'));

    // Make some changes
    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: 'Changed Title' },
    });

    // Cancel the edit
    fireEvent.click(screen.getByText('Cancel'));

    // Verify update callback was not called
    expect(mockOnTaskUpdated).not.toHaveBeenCalled();

    // Reopen dialog and verify original data is still there
    fireEvent.click(screen.getByText('Edit Task'));
    expect(screen.getByLabelText(/title/i)).toHaveValue(mockTask.title);
  });

  it('should handle API errors gracefully', async () => {
    const mockError = new Error('API Error');
    (global.fetch as jest.Mock).mockRejectedValueOnce(mockError);

    render(
      <TaskDialog
        mode="edit"
        projectId={mockProjectId}
        userStoryId={mockUserStoryId}
        sprintId={mockSprintId}
        task={mockTask}
        onTaskUpdated={mockOnTaskUpdated}
        trigger={<button>Edit Task</button>}
      />
    );

    // Open the dialog
    fireEvent.click(screen.getByText('Edit Task'));

    // Submit the form
    fireEvent.click(screen.getByText('Save Changes'));

    // Verify error message is shown
    await waitFor(() => {
      expect(screen.getByText(/an unexpected error occurred/i)).toBeInTheDocument();
    });

    // Verify update callback was not called
    expect(mockOnTaskUpdated).not.toHaveBeenCalled();
  });
}); 