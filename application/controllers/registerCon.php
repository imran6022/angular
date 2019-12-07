<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class registerCon extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->model('register_model');
		$this->load->helper('url');
		$this->load->helper('text');
	}


    function getALL(){
        $regis= $this->register_model->get_all_register();

        $posts = array();
        if(!empty($regis)){
            foreach($regis as $regiss){

                $posts[] = array(
                    'id' => $regiss->id,
                    'name' => $regiss->name,
                    'email' => $regiss->email,
                    'phone' => $regiss->phone,
                    'address' => $regiss->address,
                );
            }
        }
        $this->output
            ->set_content_type('application/json')
            ->set_output(json_encode($posts));

    }


	

}