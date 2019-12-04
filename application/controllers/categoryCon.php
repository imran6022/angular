<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class categoryCom extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->model('category_model');
		$this->load->helper('url');
		$this->load->helper('text');
	}

	public function adminCategorys()
{
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: authorization, Content-Type");

    $token = $this->input->get_request_header('Authorization');

    $isValidToken = $this->category_model->checkToken($token);

    $posts = array();
    if($isValidToken) {
        $categorys = $this->category_model->get_admin_categorys();
        foreach($categorys as $category) {
            $posts[] = array(
                'id' => $category->id,
                'category_name' => $category->category_name,
            );
        }

        $this->output
            ->set_status_header(200)
            ->set_content_type('application/json')
            ->set_output(json_encode($posts)); 
    }
}

	

}