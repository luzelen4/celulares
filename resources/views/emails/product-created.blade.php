@extends('layouts.base')

@section('content')
    <div class="container mt-3">
        <div class="row">
            <div class="col-12">
                <h1 class="alert alert-info text-center">{{ $product->watch_name }}</h1>
            </div>
            <div class="col-12">
                <div class="row">
                    <div class="col-6 offset-3">
                        <table class="table table-bordered">
                            <tr>
                                <th>Marca</th>
                                <td>{{ $product->brand }}</td>
                            </tr>
                            <tr>
                                <th>Descripción</th>
                                <td>{{ $product->description }}</td>
                            </tr>
                            <tr>
                                <th>Nro. Unidades</th>
                                <td>{{ $product->stock }}</td>
                            </tr>
                            <tr>
                                <th>Precio:</th>
                                <td>${{ number_format($product->price, 2, ',', '.') }}</td>
                            </tr>
                            <tr>
                                <th>Imagen</th>
                                <td>
                                    <img src="{{ asset("$product->photo_name") }}"  height="120" width="120">
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection