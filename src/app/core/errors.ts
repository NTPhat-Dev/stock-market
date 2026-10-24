import { HttpErrorResponse } from '@angular/common/http';

export function errorMessage(error: unknown): string {
  if (error instanceof HttpErrorResponse) {
    if (error.status === 0 || error.status === 504) {
      return 'Không kết nối được máy chủ. Hãy chạy npm run api hoặc npm run dev.';
    }
    return error.error?.message ?? 'Không thực hiện được yêu cầu. Vui lòng thử lại.';
  }
  return error instanceof Error ? error.message : 'Đã xảy ra lỗi. Vui lòng thử lại.';
}
