<?php

namespace App\Filament\Widgets;

use App\Models\News;
use App\Models\Order;
use App\Models\Souvenir;
use App\Models\Ticket;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverviewWidget extends BaseWidget
{
    protected static ?int $sort = 1;

    protected function getColumns(): int
    {
        return 4;
    }

    protected function getStats(): array
    {
        $totalRevenue = Order::where('status', 'paid')->sum('total_amount')
            + Ticket::where('status', 'confirmed')->sum('total_price');

        return [
            Stat::make('Total Orders', Order::count())
                ->description('Pesanan souvenir')
                ->descriptionIcon('heroicon-m-shopping-cart')
                ->color('success'),

            Stat::make('Total Revenue', 'Rp ' . number_format($totalRevenue, 0, ',', '.'))
                ->description('Pendapatan total')
                ->descriptionIcon('heroicon-m-currency-dollar')
                ->color('primary'),

            Stat::make('Tickets Sold', Ticket::sum('quantity'))
                ->description('Tiket terjual')
                ->descriptionIcon('heroicon-m-ticket')
                ->color('warning'),

            Stat::make('Published News', News::where('is_published', true)->count())
                ->description('Berita dipublikasi')
                ->descriptionIcon('heroicon-m-newspaper')
                ->color('info'),
        ];
    }
}
