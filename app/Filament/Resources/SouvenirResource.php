<?php

namespace App\Filament\Resources;

use App\Filament\Resources\SouvenirResource\Pages;
use App\Filament\Resources\SouvenirResource\RelationManagers;
use App\Models\Souvenir;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class SouvenirResource extends Resource
{
    protected static ?string $model = Souvenir::class;

    protected static ?string $navigationIcon = 'heroicon-o-gift';

    protected static ?string $navigationGroup = 'Museum Management';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('name')
                    ->required()
                    ->maxLength(255),
                Forms\Components\Textarea::make('description')
                    ->columnSpanFull(),
                Forms\Components\TextInput::make('price')
                    ->required()
                    ->numeric()
                    ->prefix('Rp'),

                // Hybrid Image Section
                Forms\Components\Section::make('Gambar')
                    ->description('Pilih salah satu: Upload file ATAU paste URL gambar')
                    ->schema([
                        Forms\Components\FileUpload::make('image')
                            ->label('Upload Gambar')
                            ->image()
                            ->disk('public')
                            ->directory('souvenir-images')
                            ->acceptedFileTypes(['image/jpeg', 'image/webp'])
                            ->maxSize(2048)
                            ->imageEditor()
                            ->imageEditorAspectRatios(['1:1'])
                            ->helperText('Format: .jpg/.webp | Max: 2MB | Rekomendasi: Rasio 1:1')
                            ->requiredWithout('image_url'),
                        Forms\Components\TextInput::make('image_url')
                            ->label('Atau Paste URL Gambar')
                            ->url()
                            ->helperText('Alternatif: Paste link gambar dari internet')
                            ->requiredWithout('image'),
                    ])
                    ->columns(1)
                    ->columnSpanFull(),
                Forms\Components\TextInput::make('category')
                    ->required()
                    ->maxLength(255),
                Forms\Components\TextInput::make('stock')
                    ->required()
                    ->numeric()
                    ->default(0),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('id')
                    ->label('ID')
                    ->searchable(),
                Tables\Columns\TextColumn::make('name')
                    ->searchable(),
                Tables\Columns\TextColumn::make('price')
                    ->money()
                    ->sortable(),
                Tables\Columns\TextColumn::make('category')
                    ->searchable(),
                Tables\Columns\TextColumn::make('stock')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
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
            'index' => Pages\ListSouvenirs::route('/'),
            'create' => Pages\CreateSouvenir::route('/create'),
            'edit' => Pages\EditSouvenir::route('/{record}/edit'),
        ];
    }
}
