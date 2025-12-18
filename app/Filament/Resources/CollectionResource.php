<?php

namespace App\Filament\Resources;

use App\Filament\Resources\CollectionResource\Pages;
use App\Models\MusicCollection;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class CollectionResource extends Resource
{
    protected static ?string $model = MusicCollection::class;

    protected static ?string $navigationIcon = 'heroicon-o-musical-note';

    protected static ?string $navigationGroup = 'Museum Management';

    protected static ?int $navigationSort = 1;

    protected static ?string $modelLabel = 'Koleksi';

    protected static ?string $pluralModelLabel = 'Koleksi Alat Musik';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                // General Info Section
                Forms\Components\Section::make('Informasi Umum')
                    ->schema([
                        Forms\Components\TextInput::make('name')
                            ->label('Nama Alat Musik')
                            ->required()
                            ->maxLength(255),
                        Forms\Components\Select::make('category')
                            ->label('Kategori')
                            ->options([
                                'Traditional' => 'Tradisional',
                                'Modern' => 'Modern',
                            ])
                            ->required(),
                        Forms\Components\TextInput::make('origin')
                            ->label('Asal')
                            ->placeholder('Contoh: Jawa Barat, USA')
                            ->maxLength(255),
                        Forms\Components\TextInput::make('year')
                            ->label('Tahun')
                            ->numeric()
                            ->placeholder('Contoh: 1980'),
                    ])
                    ->columns(2),

                // Description Section
                Forms\Components\Section::make('Deskripsi')
                    ->schema([
                        Forms\Components\Textarea::make('description')
                            ->label('Deskripsi Singkat')
                            ->rows(3)
                            ->columnSpanFull(),
                        Forms\Components\RichEditor::make('history')
                            ->label('Sejarah')
                            ->columnSpanFull(),
                    ]),

                // Hybrid Image Section
                Forms\Components\Section::make('Gambar')
                    ->description('Pilih salah satu: Upload file ATAU paste URL gambar')
                    ->schema([
                        Forms\Components\FileUpload::make('image')
                            ->label('Upload Gambar')
                            ->image()
                            ->disk('public')
                            ->directory('collection-images')
                            ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])
                            ->maxSize(2048)
                            ->helperText('Format: .jpg/.png/.webp | Max: 2MB | Rekomendasi: Rasio 16:9')
                            ->deletable(true)
                            ->openable(true)
                            ->downloadable(true)
                            ->previewable(true)
                            ->nullable(),
                        Forms\Components\TextInput::make('image_url')
                            ->label('Atau Paste URL Gambar')
                            ->url()
                            ->helperText('Alternatif: Paste link gambar dari internet')
                            ->requiredWithout('image'),
                    ])
                    ->columns(1),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('thumbnail')
                    ->label('Gambar')
                    ->circular(false)
                    ->height(60)
                    ->width(80),
                Tables\Columns\TextColumn::make('name')
                    ->label('Nama')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\BadgeColumn::make('category')
                    ->label('Kategori')
                    ->colors([
                        'warning' => 'Traditional',
                        'info' => 'Modern',
                    ]),
                Tables\Columns\TextColumn::make('origin')
                    ->label('Asal')
                    ->searchable(),
                Tables\Columns\TextColumn::make('year')
                    ->label('Tahun')
                    ->sortable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Dibuat')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('category')
                    ->label('Kategori')
                    ->options([
                        'Traditional' => 'Tradisional',
                        'Modern' => 'Modern',
                    ]),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListCollections::route('/'),
            'create' => Pages\CreateCollection::route('/create'),
            'edit' => Pages\EditCollection::route('/{record}/edit'),
        ];
    }
}
